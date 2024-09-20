import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarAdminComponent} from "../nav-bar-admin/nav-bar-admin.component";

@Component({
  selector: 'app-homepage-admin',
  standalone: true,
  imports: [CommonModule, NavBarAdminComponent],
  templateUrl: './homepage-admin.component.html',
  styleUrl: './homepage-admin.component.css'
})
export class HomepageAdminComponent {

}
