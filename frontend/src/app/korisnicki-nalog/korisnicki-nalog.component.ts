import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KorisnickiNalogRequest, UpdateKorisnickiNalogRequest} from "./korisnickiNalogRequest";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "./getAllKorisnickiNalogResponse";
import {DeleteKorisnickiNalogRequest} from "./deleteKorisnickiNalogRequest";
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {jePrazno} from "../Helper/Provjera";
import {NavBarAdminComponent} from "../nav-bar-admin/nav-bar-admin.component";
@Component({
  selector: 'app-korisnicki-nalog',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, NavBarAdminComponent],
  providers :[KorisnickiNalogService],
  templateUrl: './korisnicki-nalog.component.html',
  styleUrl: './korisnicki-nalog.component.css'
})
export class KorisnickiNalogComponent {
  constructor(public httpClient: HttpClient,private dialog: MatDialog,public korisnickiNalogService : KorisnickiNalogService) {
  }

  public korisnickiNalogRequest: KorisnickiNalogRequest = {
    korisnickoIme: "",
    lozinka: "",
    email:"",
    jeAdmin: true,
    jeDoktor: false,
    jeFizioterapeut: false,
    jeNjegovatelj: false,
    jeNutricionista: false,
    je2FActive:true,
  }
  public updKorisnickiNalogRequest: UpdateKorisnickiNalogRequest = {
    nalogId:0,
    korisnickoIme: "",
    lozinka: "",
    email:"",
    jeAdmin: true,
    jeDoktor: false,
    jeFizioterapeut: false,
    jeNjegovatelj: false,
    jeNutricionista: false,
    je2FActive:true,
  }
  korisnickiNalog: GetAllKorisnickiNalogResponseKorisnickiNalog[] = [];

  AddKorisnickiNalog(): void {
    this.korisnickiNalogService.DodajKorisnickiNalog( this.korisnickiNalogRequest).subscribe(request => {

    })
  }

  GetAllKorisnickiNalog(): void {
    this.korisnickiNalogService.GetAllKorisnickiNalog().subscribe(x => {

      this.korisnickiNalog = x.korisnickiNalozi
    })
  }

  getFiltriraniKorisnickiNalog() {
    return this.korisnickiNalog;
  }

  ObrisiKorisnickiNalog(data: GetAllKorisnickiNalogResponseKorisnickiNalog) {
    var deleteNalog: DeleteKorisnickiNalogRequest = {
      KorisnikId: data.nalogId
    }
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.korisnickiNalogService.ObrisiKorisnickiNalog(data).subscribe(
            response => () => {
              this.GetAllKorisnickiNalog();
            },
            (error: any) => {
              console.error('Error:', error);

              if (error.status === 500) {
                alert('Nije moguće izbrisati ovaj korisnički nalog, potrebno je izbrisati korisnika prvo!');
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

  SelectNalog(item: GetAllKorisnickiNalogResponseKorisnickiNalog) {
      this.updKorisnickiNalogRequest.nalogId=item.nalogId;
      this.korisnickiNalogRequest.korisnickoIme=item.korisnickoIme;
      this.korisnickiNalogRequest.email=item.email;
      this.korisnickiNalogRequest.jeNutricionista=item.jeNjegovatelj;
      this.korisnickiNalogRequest.jeNjegovatelj=item.jeNjegovatelj;
      this.korisnickiNalogRequest.jeFizioterapeut=item.jeFizioterapeut;
      this.korisnickiNalogRequest.jeNutricionista=item.jeNutricionista;
      this.korisnickiNalogRequest.lozinka=item.lozinka;
  }
  praznoPolje=false;
  UpdateKorisnickiNalog() {
    if(jePrazno(this.korisnickiNalogRequest.korisnickoIme) && jePrazno(this.korisnickiNalogRequest.email)
     && jePrazno(this.korisnickiNalogRequest.lozinka) && (this.korisnickiNalogRequest.jeNutricionista || this.korisnickiNalogRequest.jeNjegovatelj
      || this.korisnickiNalogRequest.jeFizioterapeut || this.korisnickiNalogRequest.jeDoktor)  )
    {
      this.updKorisnickiNalogRequest.jeNutricionista=this.korisnickiNalogRequest.jeNutricionista;
      this.updKorisnickiNalogRequest.jeFizioterapeut=this.korisnickiNalogRequest.jeFizioterapeut;
      this.updKorisnickiNalogRequest.jeNjegovatelj=this.korisnickiNalogRequest.jeNjegovatelj;
      this.updKorisnickiNalogRequest.jeDoktor=this.korisnickiNalogRequest.jeDoktor;
      this.updKorisnickiNalogRequest.email=this.korisnickiNalogRequest.email;
      this.updKorisnickiNalogRequest.korisnickoIme=this.korisnickiNalogRequest.korisnickoIme;
      this.updKorisnickiNalogRequest.lozinka=this.korisnickiNalogRequest.lozinka;
      this.korisnickiNalogService.UpdateKorisnickiNalog(this.updKorisnickiNalogRequest).subscribe(x=>{
        this.Clear();
        this.GetAllKorisnickiNalog();
          this.praznoPolje=false;
      })
    }else {
      this.praznoPolje=true;
    }
  }

    private Clear() {
        this.korisnickiNalogRequest.jeNutricionista=false;
        this.korisnickiNalogRequest.jeFizioterapeut=false;
        this.korisnickiNalogRequest.jeNjegovatelj=false;
        this.korisnickiNalogRequest.jeDoktor=false;
        this.korisnickiNalogRequest.korisnickoIme="";
        this.korisnickiNalogRequest.email="";
        this.korisnickiNalogRequest.lozinka="";
    }
}
