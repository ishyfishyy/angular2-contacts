import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contact } from './services/contact';
import { ContactStore } from './services/store';

@Component({
  selector: 'contact-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-detail.html'
})
export class ContactDetailComponent implements OnInit {
  selectedContact: Contact = new Contact();
  originalContact: Contact = new Contact();

  constructor(
    private _contactStore: ContactStore,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this._contactStore.find(id).then((contact: Contact) => {
        this.selectedContact = JSON.parse(JSON.stringify(contact));
        this.originalContact = contact;
      });
    });
  }

  save(): void {
    this._contactStore.save(this.selectedContact).then((contact: Contact) => {
      this.selectedContact = JSON.parse(JSON.stringify(this.selectedContact));
      this.originalContact = contact;
    });
  }

  get canSave() {
    return this.selectedContact.username && this.selectedContact.email;
  }

  private areEqual(obj1: any, obj2: any): boolean {
    return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
  }
}
