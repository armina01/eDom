import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertService} from "../Services/AlertService";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  alertVisible = false;
  alertMessage = '';
  alertClass = '';

  constructor(private myAlert: AlertService) { }

  ngOnInit(): void {
    this.myAlert.alertState.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertClass = `alert alert-${alert.type}`; // 'alert-success' ili 'alert-danger'
      this.alertVisible = true;

      // Automatski sakrij alert nakon 3 sekunde
      setTimeout(() => {
        this.alertVisible = false;
      }, 3000);
    });
  }
}
