import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
// import { CrudService } from '../../shared/services/crud.service'; // Import the CrudService

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  items$: Observable<any[]> | undefined;
  newItemName: string = '';

  // constructor(private crudService: CrudService) {}

  // ngOnInit() {
  //   this.loadItems();
  // }

  // loadItems() {
  //   this.items$ = this.crudService.readItems('items');
  // }

  // addItem() {
  //   this.crudService.createItem('items', { name: this.newItemName })
  //     .then(() => {
  //       console.log('Item added');
  //       this.newItemName = '';
  //     })
  //     .catch(error => console.error('Error adding item:', error));
  // }

  // updateItem(key: string, newName: string) {
  //   this.crudService.updateItem(`items/${key}`, { name: newName })
  //     .then(() => console.log('Item updated'))
  //     .catch(error => console.error('Error updating item:', error));
  // }

  // deleteItem(key: string) {
  //   this.crudService.deleteItem(`items/${key}`)
  //     .then(() => console.log('Item deleted'))
  //     .catch(error => console.error('Error deleting item:', error));
  // }
}
