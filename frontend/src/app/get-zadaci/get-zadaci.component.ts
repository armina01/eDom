import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GetAllZadatakResponse, GetAllZadatakResponseZadatak} from "./getAllZadaciResponse";
import {DodajZadatakRequest} from "./dodajZadatakRequest";
import { MyAuthService} from "../Services/MyAuthService";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";
import {FormsModule} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {DodajZadatakResponse} from "./DodajZadatakResponse";
import {finalize} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ZadaciService} from "../Services/ZadaciService";
import {NavBarNjejgovateljComponent} from "../nav-bar-njejgovatelj/nav-bar-njejgovatelj.component";

@Component({
  selector: 'app-get-zadaci',
  standalone: true,
    imports: [CommonModule, FormsModule, NavBarNjejgovateljComponent],
  providers: [ZadaciService],
  templateUrl: './get-zadaci.component.html',
  styleUrl: './get-zadaci.component.css'
})
export class GetZadaciComponent {

  constructor(public httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
              private _myAuthService: MyAuthService
  ,private dialog: MatDialog,private route: ActivatedRoute,
              private zadaciService:ZadaciService) {
  }
  ngOnInit(){

    this.zadaciService.GetVrsteZadataka().subscribe(response=>{
      this.OpstiZadatakId=response.vrsteZadatka.find(x=>x.naziv==="Opsti zadatak")?.vrstaZadatkaId??0;
      this.dodajOpstiZadatak.vrstaZadatkaId=response.vrsteZadatka.find(x=>x.naziv==="Opsti zadatak")?.vrstaZadatkaId??0;
      this.updateOpstiZadatak.vrstaZadatkaId=response.vrsteZadatka.find(x=>x.naziv==="Opsti zadatak")?.vrstaZadatkaId??0;
    })
    this.zadaciService.GetVrsteZadataka().subscribe(response=>{
      this.MedicinskiZadatakId=response.vrsteZadatka.find(x=>x.naziv==="Medicinski zadatak")?.vrstaZadatkaId??0;
    });
    this.zadaciService.GetVrsteZadataka().subscribe(response=>{
      this.FizijatrijskiZadatakId=response.vrsteZadatka.find(x=>x.naziv==="Fizijatrijski zadatak")?.vrstaZadatkaId??0;
    });
    this.zadaciService.GetIntervalZadataka().subscribe(response=>{
      this.dodajOpstiZadatak.intervalZadatkaId=response.intervaliZadatka.find(x=>x.jeDnevni===true)?.intervalZadatkaId??0;
      this.updateOpstiZadatak.intervalZadatkaId=response.intervaliZadatka.find(x=>x.jeDnevni===true)?.intervalZadatkaId??0;
      this.DnevniZadatakId=response.intervaliZadatka.find(x=>x.jeDnevni===true)?.intervalZadatkaId??0;
})
    this.GetAllZadaci();
    this.njegovatelj=this.getZaposlenik();
    this.route.params.subscribe(params => {
      this._korisnikDomaId = +params['id'] || 0;
    });
  }
  showOpsti:boolean=false;
  showFizijatrijski=false;
  showMedicinski=false;
  public MedicinskiZadatakId:number=0;
  public OpstiZadatakId=0;
  public FizijatrijskiZadatakId:number=0;
  public DnevniZadatakId=0;
  public SedmicniZadatakId=0;
  public odabraniDatum:Date=new Date();
  public njegovatelj:GetAllNjegovateljaResponseNjegovatelj|null=null;
  public medicinskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public opstiZadatak: GetAllZadatakResponseZadatak[]=[];
  public fizijatrijskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public zadaci:GetAllZadatakResponseZadatak[]=[];
  public korisnickiNalog=this._myAuthService.getAuthorizationToken()?.korisnickiNalog;
  public _korisnikDomaId:number=0;
  public dodajOpstiZadatak:DodajZadatakRequest={
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
      zaposlenikEditovaoId:null,
      intervalZadatkaId:0,
      vrstaZadatkaId:0,
    korisnikDomaId:0
  }
  public updateOpstiZadatak:GetAllZadatakResponseZadatak={
    zadatakId:0,
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
    zaposlenikEditovaoId:null,
    intervalZadatkaId:0,
    vrstaZadatkaId:0,
    korisnikDomaId:0
  }
  GetAllMedicinskiZadaci() {
    this.medicinskiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===this.MedicinskiZadatakId)
    this.showOpsti=false;
    this.showFizijatrijski=false;
    this.showMedicinski=true;
  }
  GetAllFizijatrijskiZadaci() {
    this.fizijatrijskiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===this.FizijatrijskiZadatakId)
    this.showOpsti=false;
    this.showFizijatrijski=true;
    this.showMedicinski=false;
  }
  GetAllOpstiZadaci() {
    console.log("Opsti zadatak iD",this.OpstiZadatakId);
    console.log(this.zadaci);
    this.opstiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===this.OpstiZadatakId &&
    x.korisnikDomaId===this._korisnikDomaId)
    this.showOpsti=true;
    this.showFizijatrijski=false;
    this.showMedicinski=false;
    this.showDodajOpstiZadatak=true;
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
    let todayDate=new Date(this.odabraniDatum);
    console.log(todayDate);
    this.zadaciService.GetAllZadaci().subscribe(x => {
      console.log("Zadaci",this.zadaci)
      this.zadaci = x.zadaci.filter(zadatak => {
        const datumPostavke = new Date(zadatak.datumPostavke);
        if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {
          return (
              zadatak.intervalZadatkaId === this.DnevniZadatakId &&
              todayDate.getFullYear() === datumPostavke.getFullYear() &&
              todayDate.getMonth() === datumPostavke.getMonth() &&
              todayDate.getDate() === datumPostavke.getDate()
          );
        } else {
          console.error("Invalid datumPostavke:", zadatak.datumPostavke);
          return false;
        }
      });
      console.log("Zadaci",this.zadaci);
    })
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
      this.zadaciService.DodajZadatak(data).subscribe((response:DodajZadatakResponse) => {
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
    this.zadaciService.UpdateZadatak(this.updateOpstiZadatak).subscribe(
        () => {
          console.log("Uspjesan update");
        });
  }

  RefreshOpstiZadaci() {
    let todayDate=new Date(this.odabraniDatum);

    this.zadaciService.GetAllZadaci().subscribe(x => {

      x.zadaci.forEach(y=> {
        console.log("Danasnji datum", todayDate, "Datum zadatka",y.datumPostavke)
      })
      this.zadaci = x.zadaci.filter(zadatak => {
        const datumPostavke = new Date(zadatak.datumPostavke);
        if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {
          return (
              zadatak.intervalZadatkaId === this.DnevniZadatakId &&
              todayDate.getFullYear() === datumPostavke.getFullYear() &&
              todayDate.getMonth() === datumPostavke.getMonth() &&
              todayDate.getDate() === datumPostavke.getDate()
          );
        } else {
          console.error("Invalid datumPostavke:", zadatak.datumPostavke);
          return false;
        }
      });
      this.GetAllOpstiZadaci();
      console.log("Zadaciii ",this.zadaci)
    })
  }
   IzbrisiZadatak(item: GetAllZadatakResponseZadatak) {
      const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.zadaciService.IzbrisiZadatak(item).pipe(
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
