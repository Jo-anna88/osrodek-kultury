import {EventEmitter, Injectable} from '@angular/core';
import {Observable, BehaviorSubject, Subject, Subscription} from "rxjs";
import {ModalConfiguration, ModalType} from "../../shared/components/modal/modal";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalConfiguration$ = new BehaviorSubject<ModalConfiguration>({});
  private modalEvent$ = new Subject<any>();
  private modalDataSubscription: Subscription = new Subscription();
  public isModalOpen: boolean = false;

  constructor (private router: Router){}

  /* Pozwala wysyłać dane z formularzy np. po 'submit'*/
  emitModalEvent(data: any) {
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

  openModal(modalType: ModalType, subscription: Subscription) {
    this.isModalOpen = true;
    this.router.navigate([{outlets: {modalOutlet: ['modal', modalType]}}]);
    this.setDataSubscription(subscription);
  }

  closeModal() {
    //this.setConfiguration({});
    this.isModalOpen = false;
    this.router.navigate([{ outlets: { modalOutlet: null } }]);
    this.removeDataSubscription();
  }

  setDataSubscription(subscription: Subscription) {
    this.modalDataSubscription = subscription;
  }

  removeDataSubscription() {
    this.modalDataSubscription.unsubscribe();
  }
}
