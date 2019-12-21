import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  enteredYear;
  enteredMake = '';
  enteredModel = '';
  enteredStockNum;
  form: FormGroup;

  constructor(public inventoryService: InventoryService) {}

  onAddInventory(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this.inventoryService.addInventory(form.value.year, form.value.make, form.value.model, form.value.stockNumber);
    form.resetForm();
  }

  ngOnInit() {
    this.form = new FormGroup({
      upload: new FormControl(null, {validators: [Validators.required]})
    });

  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({upload: file});
    this.form.get('upload').updateValueAndValidity();
    this.inventoryService.addFile(file);
  }


}
