import {EventEmitter, Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {ModalConfiguration} from "../../shared/components/modal/modal";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalConfiguration$ = new BehaviorSubject<ModalConfiguration>({});
  private eventEmitter: EventEmitter<any> = new EventEmitter<any>(); // TODO: może lepiej zmienić to na Subject?

  constructor (private router: Router){}

  /* Pozwala wysyłać dane z formularzy np. po 'submit'*/
  emitEvent(data: any) {
    this.eventEmitter.emit(data);
  }

  /* Pozwala odbierać dane z formularzy np. w komponentach, w których wywołano otwarcie formularza w oknie modalnym */
  getEvent(): Observable<any> {
    return this.eventEmitter.asObservable();
  }

  setConfiguration(config: ModalConfiguration) {
    this.modalConfiguration$.next(config);
  }

  /* Expose modalConfiguration$ as Observable to conceal subject like behavior */
  getConfiguration(): Observable<ModalConfiguration> {
    return this.modalConfiguration$.asObservable();
  }

  close() {
    this.setConfiguration({});
    this.router.navigate([{ outlets: { modalOutlet: null } }]);
  }
}
