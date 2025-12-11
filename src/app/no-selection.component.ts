import { Component } from '@angular/core';

@Component({
  selector: 'no-selection',
  standalone: true,
  templateUrl: './no-selection.html'
})
export class NoSelectionComponent {
  message: string = 'Please pick a contact from the list.';
}
