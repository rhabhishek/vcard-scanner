import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/*
  Generated class for the ContactsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactsServiceProvider {

  constructor(private contacts: Contacts) {
    console.log('Hello ContactsServiceProvider Provider');
  }

  saveContact(contact){
    let contactObj: Contact = this.contacts.create();

    contact.name = new ContactName(null, 'Smith', 'John');
    contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    contact.save().then(
  () => console.log('Contact saved!', contact),
  (error: any) => console.error('Error saving contact.', error)
  );
  }
}
