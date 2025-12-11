import { Contact } from './contact';
import { Constants } from './constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactStore {
  contacts: Array<Contact> = [];

  constructor(_http: HttpClient) {
    const storedContacts = localStorage.getItem(Constants.STORAGE_CONTACTS);
    this.contacts = storedContacts ? JSON.parse(storedContacts) : [];

    if (!this.contacts || this.contacts.length === 0) {
      _http.get<any[]>('https://api.github.com/users')
        .subscribe({
          next: (users) => {
            this.contacts = users.map((user: { id: number, login: string, avatar_url: string, type: string }) => {
              let contact = new Contact();
              contact.id = user.id;
              contact.username = user.login;
              contact.email = user.login + '@email.com';
              contact.avatarUrl = user.avatar_url;
              contact.description = user.type;
              contact.checked = false;

              return contact;
            });
            this.contacts = this.contacts.splice(0, 20);
            this.updateStorage();
          },
          error: (err) => {
            console.log(err);
            // Initialize with empty array on error
            this.contacts = [];
          }
        });
    }
  }

  addNew(): void {
    let contact = new Contact();
    contact.id = this.getId();
    contact.username = 'username';
    contact.email = 'e-mail';

    this.contacts.push(contact);
    this.updateStorage();
  }

  add(contact: Contact): void {
    this.contacts.push(contact);
    this.updateStorage();
  }

  remove(contact: Contact): void {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
    this.updateStorage();
  }

  save(contact: Contact) {
    return new Promise(executor => {
      let instance = JSON.parse(JSON.stringify(contact));
      let found: Contact = this.contacts.filter(x => x.id == contact.id)[0];

      if (found) {
        let index = this.contacts.indexOf(found);
        Object.assign(this.contacts[index], instance);
      } else {
        instance.id = this.getId();
        this.contacts.push(instance);
      }
      this.updateStorage();

      executor(instance);
    });
  }

  find(id: number) {
    return new Promise(executor => {
      let found: Contact = this.contacts.filter(x => x.id == id)[0];
      executor(found);
    });
  }

  private getId(): number {
    return Math.round(Math.random() * 100000);
  }

  updateStorage(): void {
    localStorage.setItem(Constants.STORAGE_CONTACTS, JSON.stringify(this.contacts));
  }
}
