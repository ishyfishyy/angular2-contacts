import { Routes } from '@angular/router';
import { NoSelectionComponent } from './no-selection.component';
import { ContactDetailComponent } from './contact-detail.component';

export const routes: Routes = [
  { path: '', component: NoSelectionComponent },
  { path: 'contacts', component: NoSelectionComponent },
  { path: 'contacts/:id', component: ContactDetailComponent }
];
