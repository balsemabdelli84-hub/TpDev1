import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from './product.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private service = inject(ProductService);

  products = signal<Product[]>([]);
  selected = signal<Product | null>(null);
  editId = signal<number | null>(null);
  form: Product = this.emptyForm();

  ngOnInit() { this.load(); }

  emptyForm(): Product {
    return { name: '', description: '', price: 0, quantity: 0 };
  }

  load() {
    this.service.getAll().subscribe(data => this.products.set(data));
  }

  submit() {
    const id = this.editId();
    const op = id !== null
      ? this.service.update(id, this.form)
      : this.service.create(this.form);
    op.subscribe(() => { this.cancel(); this.load(); });
  }

  view(id: number) {
    this.service.getOne(id).subscribe(p => this.selected.set(p));
  }

  edit(p: Product) {
    this.editId.set(p.id!);
    this.form = { ...p };
  }

  remove(id: number) {
    this.service.delete(id).subscribe(() => {
      if (this.selected()?.id === id) this.selected.set(null);
      this.load();
    });
  }

  cancel() {
    this.editId.set(null);
    this.form = this.emptyForm();
  }
}
