import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new Subject<{ message: string, type: string }>();
  alertState = this.alertSubject.asObservable();

  showSuccess(message: string) {
    this.alertSubject.next({ message, type: 'success' });
  }

  showError(message: string) {
    this.alertSubject.next({ message, type: 'danger' });
  }
}
