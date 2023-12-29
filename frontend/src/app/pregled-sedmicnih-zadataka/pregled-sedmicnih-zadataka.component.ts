import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MY_AUTH_SERVICE_TOKEN, MyAuthService} from "../Services/MyAuthService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";
import {GetAllZadatakResponse, GetAllZadatakResponseZadatak} from "../get-zadaci/getAllZadaciResponse";
import {DodajZadatakRequest} from "../get-zadaci/dodajZadatakRequest";
import {MyConfig} from "../my-config";
import {DodajZadatakResponse} from "../get-zadaci/DodajZadatakResponse";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {finalize} from "rxjs";

@Component({
  selector: 'app-pregled-sedmicnih-zadataka',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './pregled-sedmicnih-zadataka.component.html',
  styleUrl: './pregled-sedmicnih-zadataka.component.css'
})
export class PregledSedmicnihZadatakaComponent {

  constructor(public httpClient: HttpClient,@Inject(MY_AUTH_SERVICE_TOKEN) private _myAuthService: MyAuthService
      ,private dialog: MatDialog,private route: ActivatedRoute) {
  }
  showOpsti:boolean=false;
  showFizijatrijski=false;
  showMedicinski=false;
  public njegovatelj:GetAllNjegovateljaResponseNjegovatelj|null=null;
  public medicinskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public opstiZadatak: GetAllZadatakResponseZadatak[]=[];
  public fizijatrijskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public zadaci:GetAllZadatakResponseZadatak[]=[];
  public korisnickiNalog=this._myAuthService.getAuthorizationToken()?.korisnickiNalog;
  public _korisnikDomaId:number=0;
  public odabraniDatum:Date=new Date();
  public dodajOpstiZadatak:DodajZadatakRequest={
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
    zaposlenikEditovaoId:null,
    intervalZadatkaId:2,
    vrstaZadatkaId:6,
    korisnikDomaId:0
  }
  public updateOpstiZadatak:GetAllZadatakResponseZadatak={
    zadatakId:0,
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
    zaposlenikEditovaoId:null,
    intervalZadatkaId:2,
    vrstaZadatkaId:6,
    korisnikDomaId:0
  }
  GetAllMedicinskiZadaci() {
    this.medicinskiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===4)
    this.showOpsti=false;
    this.showFizijatrijski=false;
    this.showMedicinski=true;
  }
  GetAllFizijatrijskiZadaci() {
    this.fizijatrijskiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===5)
    this.showOpsti=false;
    this.showFizijatrijski=true;
    this.showMedicinski=false;
  }
  GetAllOpstiZadaci() {
    this.GetAllZadaci();
    this.opstiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===6)
    this.showOpsti=true;
    this.showFizijatrijski=false;
    this.showMedicinski=false;
  }
  ngOnInit(){
    this.GetAllZadaci();
    this.njegovatelj=this.getZaposlenik();
    this.route.params.subscribe(params => {
      this._korisnikDomaId = +params['id'] || 0;
    });
  }
  getZaposlenik():GetAllNjegovateljaResponseNjegovatelj | null {
    let korisnik = window.localStorage.getItem("korisnik")??"";
    try {
      return JSON.parse(korisnik);
    }
    catch (e){
      return null;
    }
  }
  GetAllZadaci() {
    let url: string = MyConfig.adresa_servera + `/getAllZadatak`;
    this.httpClient.get<GetAllZadatakResponse>(url).subscribe(x => {
      this.zadaci = x.zadaci.filter(zadatak => {
        const todayDate = new Date(this.odabraniDatum);
        const datumPostavke = new Date(zadatak.datumPostavke);

        if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {

          const startOfWeek = new Date(todayDate);
          startOfWeek.setDate(todayDate.getDate() - (todayDate.getDay() + 6) % 7 );

          const endOfWeek = new Date(todayDate);
          endOfWeek.setDate(todayDate.getDate() - todayDate.getDay() + 7);
          return (
              zadatak.intervalZadatkaId === 2 &&
              datumPostavke >= startOfWeek &&
              datumPostavke <= endOfWeek
          );
        } else {
          // Handle the case where datumPostavke is not a valid Date object
          console.error("Invalid datumPostavke:", zadatak.datumPostavke);
          return false;
        }
      });
    });
  }
  getAllMedicinskizadaci(){
    return this.medicinskiZadatak
  }
  getAllOpstizadaci(){
    return this.opstiZadatak
  }
  getAllFizijatrijskizadaci(){
    return this.fizijatrijskiZadatak
  }
  showDodajOpstiZadatak=false
  PrikaziDodajOpstiZadatak() {
    this.showDodajOpstiZadatak=true;
  }
  DodajOpstiZadatak()
  {
    console.log()
    this.dodajOpstiZadatak.zaposlenikPostavioId=this.njegovatelj?.zaposlenikId??null;
    this.dodajOpstiZadatak.korisnikDomaId=this._korisnikDomaId;
    this.DodajZadatak(this.dodajOpstiZadatak);


  }
  public showEmpty=false;
  DodajZadatak(data:DodajZadatakRequest){
    if(data.opis!=="") {
      console.log("Data",data);
      let url: string = MyConfig.adresa_servera + `/dodajZadatak`;
      this.httpClient.post<DodajZadatakResponse>(url, data).subscribe((response:DodajZadatakResponse) => {
        this.RefreshOpstiZadaci();
        this.dodajOpstiZadatak.opis="";
        this.dodajOpstiZadatak.status=false;
      })
    }
    else {
      this.showEmpty=true;
    }
  }

  UpdateOpstiZadatak(item: GetAllZadatakResponseZadatak) {
    this.updateOpstiZadatak.zadatakId=item.zadatakId;
    this.updateOpstiZadatak.opis=item.opis;
    this.updateOpstiZadatak.status=item.status;
    this.updateOpstiZadatak.intervalZadatkaId=item.intervalZadatkaId;
    this.updateOpstiZadatak.zaposlenikPostavioId=item.zaposlenikPostavioId;
    this.updateOpstiZadatak.vrstaZadatkaId=item.vrstaZadatkaId;
    this.updateOpstiZadatak.datumPostavke=item.datumPostavke;
    this.updateOpstiZadatak.zaposlenikEditovaoId=this.getZaposlenik()?.zaposlenikId??null;
    this.updateOpstiZadatak.korisnikDomaId=this._korisnikDomaId;
    let url: string = MyConfig.adresa_servera + `/updateZadatak`;
    this.httpClient.post(url,  this.updateOpstiZadatak).subscribe(
        () => {
          console.log("Uspjesan update");
        });
  }

  RefreshOpstiZadaci() {
    let url: string = MyConfig.adresa_servera + `/getAllZadatak`;
    this.httpClient.get<GetAllZadatakResponse>(url).subscribe(x => {
      this.httpClient.get<GetAllZadatakResponse>(url).subscribe(x => {
        this.zadaci = x.zadaci.filter(zadatak => {
          const todayDate = new Date(this.odabraniDatum);
          const datumPostavke = new Date(zadatak.datumPostavke);

          // Check if datumPostavke is a valid Date object
          if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {
            // Adjust the startOfWeek and endOfWeek for Monday to Sunday week
            const startOfWeek = new Date(todayDate);
            startOfWeek.setDate(todayDate.getDate() - (todayDate.getDay() + 6) % 7 + 1); // Set to the first day of the week (Monday)

            const endOfWeek = new Date(todayDate);
            endOfWeek.setDate(todayDate.getDate() - todayDate.getDay() + 7); // Set to the last day of the week (Sunday)

            return (
                zadatak.intervalZadatkaId === 2 &&
                datumPostavke >= startOfWeek &&
                datumPostavke <= endOfWeek
            );
          } else {
            // Handle the case where datumPostavke is not a valid Date object
            console.error("Invalid datumPostavke:", zadatak.datumPostavke);
            return false;
          }
        });
      });

      this.GetAllOpstiZadaci();
    });
  }
  IzbrisiZadatak(item: GetAllZadatakResponseZadatak) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/obrisiZadatak`;
        const params = new HttpParams().set('ZadatakId', item.zadatakId);
        this.httpClient.delete(url, {params}).pipe(
            finalize(() => {
              this.RefreshOpstiZadaci();
            })
        ).subscribe(
            request => () => {
              console.log('Delete successful:', request);
            },
            (error: any) => {
              console.error('Error:', error);
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
