import {EventEmitter, Injectable} from '@angular/core';
import {Observable, BehaviorSubject, Subject} from "rxjs";
import {ModalConfiguration, ModalType} from "../../shared/components/modal/modal";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalConfiguration$ = new BehaviorSubject<ModalConfiguration>({});
  private modalEvent$ = new Subject<any>();

  constructor (private router: Router){}

  /* Pozwala wysyłać dane z formularzy np. po 'submit'*/
  emitEvent(data: any) {
    this.modalEvent$.next(data);
  }

  /* Pozwala odbierać dane z formularzy np. w komponentach, w których wywołano otwarcie formularza w oknie modalnym */
  getModalEvent(): Observable<any> {
    return this.modalEvent$.asObservable();
  }

  setConfiguration(config: ModalConfiguration) {
    this.modalConfiguration$.next(config);
  }

  /* Expose modalConfiguration$ as Observable to conceal subject like behavior */
  getConfiguration(): Observable<ModalConfiguration> {
    return this.modalConfiguration$.asObservable();
  }

  openModal(modalType: ModalType) {
    this.router.navigate([{outlets: {modalOutlet: ['modal', modalType]}}]);
  }

  closeModal() {
    //this.setConfiguration({});
    this.router.navigate([{ outlets: { modalOutlet: null } }]);
  }
}
