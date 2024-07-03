import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MyConfig} from "../my-config";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {OpstinaGetAllResponse, OpsinaGetAllResponseOpstina} from "./opstina-getAll";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {OpstinaServiceService} from "../Services/OpstinaService";



@Component({
  selector: 'app-opstina',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [OpstinaServiceService],
  templateUrl: './opstina.component.html',
  styleUrl: './opstina.component.css'
})
export class OpstinaComponent {
  opstine: OpsinaGetAllResponseOpstina[]=[];


  constructor(public httpClient:HttpClient, private dialog: MatDialog, private opstinaService: OpstinaServiceService) {


  }

  Dodaj(opstina: {nazivOpstine:string, postanskiBroj:number}) {
    this.opstinaService.DodajOpstinu(opstina).subscribe((res)=>
      console.log("Opština dodana"))
  }

  GetAllOpstine() {
    this.opstinaService.GetAllOpstine().subscribe((x:OpstinaGetAllResponse)=> {
      this.opstine = x.opstine;
    })
  }
  getAllOpstine() {
    return this.opstine;
  }

  ObrisiOpstinu(data: OpsinaGetAllResponseOpstina) {

    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati opštinu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.opstinaService.IzbrisiOpstinu(data).subscribe(
          response => () => {
            console.log("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati opštinu');
              console.error('Handle 500 error here');
            } else {
              // Handle other errors
              alert('An error occurred.');
            }
          })
      }
    });
  }
  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };

}


