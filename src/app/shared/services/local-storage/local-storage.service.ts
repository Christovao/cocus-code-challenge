import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readonly notesKey: string = 'notes';

  private encryptionKey = environment.encryptionKey;

  setItem(key: string, value: any): void {
    const jsonString = JSON.stringify(value);
    const encryptedValue = CryptoJS.AES.encrypt(
      jsonString,
      this.encryptionKey
    ).toString();

    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);

    if (encryptedValue) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey);
        const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedValue);
      } catch (error) {
        console.error('Error decrypting data from localStorage', error);
        return null;
      }
    }

    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
