import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
