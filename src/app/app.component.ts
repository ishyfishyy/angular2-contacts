import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';
import { ContactListComponent } from './contact-list.component';

@Component({
  selector: 'contacts-app',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, ContactListComponent],
  templateUrl: './app.html'
})
export class App {
}
