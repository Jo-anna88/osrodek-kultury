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

  get(key: string): string {
    return this.exists(key) ? localStorage.getItem(key)! : ""
  }

  clear() {
    localStorage.clear();
  }

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
