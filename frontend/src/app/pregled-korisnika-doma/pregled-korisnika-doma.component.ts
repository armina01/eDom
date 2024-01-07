import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {KorisnikDomaGetAllResponse, KorisnikDomaGetAllResponseKorisnik} from "./korisnikDoma-getAll-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {KorisnikDomaUpdateRequest} from "./korisnikDomaUpdateRequest";
import {OpsinaGetAllResponseOpstina, OpstinaGetAllResponse} from "../opstina/opstina-getAll";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-pregled-korisnika-doma',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pregled-korisnika-doma.component.html',
  styleUrl: './pregled-korisnika-doma.component.css'
})
export class PregledKorisnikaDomaComponent implements  OnInit{

  constructor(public httpClient:HttpClient, private dialog: MatDialog, public router: Router) {

  }

  public korisnikUpdateRequest: KorisnikDomaUpdateRequest ={
    korisnikDomaID:0,
    imePrezime:"",
    jmbg: "",
    datumRodjenja: "",
    brojSobe: 0,
    opstinaID:0,
    slika_base64_format:""

  }
  pretragaNaziv="";
  korisnici:KorisnikDomaGetAllResponseKorisnik[]=[];
  public odabraniKorisnik: KorisnikDomaUpdateRequest | null=null;
  options:OpsinaGetAllResponseOpstina[]=[];


  ngOnInit(): void {
    let url=MyConfig.adresa_servera +`/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe({
      next: x =>{
        x.korisnici.forEach(k=>{
          k.random = this.getRandomNumber();
        })
        this.korisnici=x.korisnici;

      },
      error: x =>{
        alert("greska: " + x.error)
      }
    })
  }
  getFiltriraniKorisnici() {
    return this.korisnici.filter(x=>(x.imePrezime.toLowerCase()).startsWith(this.pretragaNaziv.toLowerCase()))
  }

  ObrisiKorisnika(data: KorisnikDomaGetAllResponseKorisnik) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati opštinu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/korisnikDoma-obrisi`;
        const params = new HttpParams().set('KorisnikDomaID', data.korisnikDomaID);
        this.httpClient.delete(url, {params}).subscribe(
          response => () => {
            console.log("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati korisnika');
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


  UpdateKorisnika() {
    let podaci=this.odabraniKorisnik
    console.log(podaci);
    const url = MyConfig.adresa_servera+`/korisnikDoma-update`;
    this.httpClient.post(url, podaci).subscribe((res) =>
      console.log("Korisnik doma updatovan"))
    this.ngOnInit();
  }

  OdaberiKorisnika(item: KorisnikDomaGetAllResponseKorisnik) {
    this.odabraniKorisnik={
      korisnikDomaID:item.korisnikDomaID,
      imePrezime: item.imePrezime,
      jmbg: item.jmbg,
      datumRodjenja: item.datumRodjenja,
      brojSobe: item.brojSobe,
      opstinaID:item.opstinaID,
      slika_base64_format:""

    }
    console.log(this.odabraniKorisnik);
    this.GetAllOpstine().subscribe((data)=>{
      this.options=data;
    });

  }
  GetAllOpstine(): Observable<OpsinaGetAllResponseOpstina[]>{
    let url=MyConfig.adresa_servera + `/opstina-getAll`
    return this.httpClient.get<OpstinaGetAllResponse>(url).pipe(
      map((response:OpstinaGetAllResponse)=>response.opstine)
    );
  }


  PrikaziNapomene(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledNapomena', item.korisnikDomaID]);

  }

  PrikaziAktivneNapomene(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledAktivnihNapomena', item.korisnikDomaID]);
  }

  PregledZadataka(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregleddnevnihzadataka', item.korisnikDomaID]);
  }

  PregledSedmicnihZadataka(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledsedmicnihzadataka', item.korisnikDomaID]);
  }

  PregledArhiveZadataka(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledarhivezadataka', item.korisnikDomaID]);

  }

  protected readonly MyConfig = MyConfig;

  generisi_preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file)
    {
      var reader = new FileReader();
      reader.onload = ()=>{
        this.odabraniKorisnik!.slika_base64_format = reader.result?.toString();
      }
      reader.readAsDataURL(file)
    }

  }

  private getRandomNumber() {
    let min = 1;
    let max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
