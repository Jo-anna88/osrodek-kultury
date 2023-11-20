import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ModalConfiguration} from "../../shared/components/modal/modal";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalTitle$ = new BehaviorSubject<string>('');
  private isClosable$ = new BehaviorSubject<boolean>(true);
  private modalConfiguration$ = new BehaviorSubject<ModalConfiguration>({});
  private eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor (private router: Router){}

  emitEvent(data: any) {
    this.eventEmitter.emit(data);
  }

  getEvent(): Observable<any> {
    return this.eventEmitter.asObservable();
  }

  setModalTitle(title: string) {
    this.modalTitle$.next(title);
  }

  setIsClosable(value: boolean) {
    this.isClosable$.next(value);
  }

  setConfiguration(config: ModalConfiguration) {
    this.modalConfiguration$.next(config);
  }

  getConfiguration(): Observable<ModalConfiguration> {
    return this.modalConfiguration$.asObservable();
  }

  close() {
    this.router.navigate([{ outlets: { modalOutlet: null } }]);
  }
}
