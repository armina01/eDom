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
import {SignalRService} from "../Services/signalR.service";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";

@Component({
  selector: 'app-get-zadaci',
  standalone: true,
    imports: [CommonModule, FormsModule, NavBarNjejgovateljComponent],
  providers: [ZadaciService,SignalRService],
  templateUrl: './get-zadaci.component.html',
  styleUrl: './get-zadaci.component.css'
})
export class GetZadaciComponent {

  constructor(public httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
              private _myAuthService: MyAuthService
  ,private dialog: MatDialog,private route: ActivatedRoute,
              private zadaciService:ZadaciService) {
  }
  jeNjegovatelj:boolean=false;
  jeDoktor:boolean=false;
  jeFizijatar:boolean=false;
  korisnik:KorisnikDomaGetAllResponseKorisnik|undefined=undefined;
  ngOnInit(){
    if(this._myAuthService.jeNjegovatelj())
    {
      this.jeNjegovatelj=true;
    }else if (this._myAuthService.jeFizioterapeut()) {
      this.jeFizijatar=true;
    }else if(this._myAuthService.jeDoktor())
    {
      this.jeDoktor=true;
    }
      this.zadaciService.GetVrsteZadataka().subscribe(response=>{
      this.OpstiZadatakId=response.vrsteZadatka.find(x=>x.naziv==="Opsti zadatak")?.vrstaZadatkaId??0;
      this.dodajOpstiZadatak.vrstaZadatkaId=response.vrsteZadatka.find(x=>x.naziv==="Opsti zadatak")?.vrstaZadatkaId??0;
      this.updateOpstiZadatak.vrstaZadatkaId=response.vrsteZadatka.find(x=>x.naziv==="Opsti zadatak")?.vrstaZadatkaId??0;
      this.MedicinskiZadatakId=response.vrsteZadatka.find(x=>x.naziv==="Medicinski zadatak")?.vrstaZadatkaId??0;
        this.FizijatrijskiZadatakId=response.vrsteZadatka.find(x=>x.naziv==="Fizijatrijski zadatak")?.vrstaZadatkaId??0;

        this.GetAllZadaci();
    })
    this.zadaciService.GetVrsteZadataka().subscribe(response=>{

    });
    this.zadaciService.GetVrsteZadataka().subscribe(response=>{

    });
    this.zadaciService.GetIntervalZadataka().subscribe(response=>{
      this.dodajOpstiZadatak.intervalZadatkaId=response.intervaliZadatka.find(x=>x.jeDnevni===true)?.intervalZadatkaId??0;
      this.updateOpstiZadatak.intervalZadatkaId=response.intervaliZadatka.find(x=>x.jeDnevni===true)?.intervalZadatkaId??0;
      this.DnevniZadatakId=response.intervaliZadatka.find(x=>x.jeDnevni===true)?.intervalZadatkaId??0;
})


    this.njegovatelj=this.getZaposlenik();
    this.route.params.subscribe(params => {
      this._korisnikDomaId = +params['id'] || 0;
    });
    this.PronadjiKorisnika();
  }
  PronadjiKorisnika(){
    let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x:KorisnikDomaGetAllResponse)=>{
      this.korisnik=x.korisnici.find(x=>x.korisnikDomaID===this._korisnikDomaId) ;
    })

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
  public updateMedicinskiZadatak:GetAllZadatakResponseZadatak={
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
  public updateFizijatrijskiZadatak:GetAllZadatakResponseZadatak={
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
    this.zadaciService.GetAllZadaci().subscribe(x => {

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
      this.opstiZadatak = this.zadaci.filter(zadatak =>
        zadatak.vrstaZadatkaId === this.OpstiZadatakId &&
        zadatak.korisnikDomaId === this._korisnikDomaId
      );
      this.medicinskiZadatak= this.zadaci.filter(zadatak =>
        zadatak.vrstaZadatkaId === this.MedicinskiZadatakId &&
        zadatak.korisnikDomaId === this._korisnikDomaId
      );
      this.fizijatrijskiZadatak= this.zadaci.filter(zadatak =>
        zadatak.vrstaZadatkaId === this.FizijatrijskiZadatakId &&
        zadatak.korisnikDomaId === this._korisnikDomaId
      );
      console.log("Zadaci:", this.zadaci, "Opsti zadaci:", this.opstiZadatak,"Medicinski", this.medicinskiZadatak,this.MedicinskiZadatakId,this.OpstiZadatakId);
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

    this.dodajOpstiZadatak.zaposlenikPostavioId=this.njegovatelj?.zaposlenikId??null;
    this.dodajOpstiZadatak.korisnikDomaId=this._korisnikDomaId;
    if(this.dodajOpstiZadatak.opis!=="") {
      this.DodajZadatak(this.dodajOpstiZadatak);
    }
    else {
      this.showEmpty=true;
    }
    this.opstiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===this.OpstiZadatakId &&
      x.korisnikDomaId===this._korisnikDomaId)
    this.ngOnInit();
  }
  public showEmpty=false;
  DodajZadatak(data:DodajZadatakRequest){

      this.zadaciService.DodajZadatak(data).subscribe((response:DodajZadatakResponse) => {
        this.RefreshOpstiZadaci();
        this.dodajOpstiZadatak.opis="";
        this.dodajMedicinskiZadatak.opis="";
        this.showEmpty=false;
        this.showEmptyMed=false;
        this.dodajOpstiZadatak.status=false;
        this.dodajMedicinskiZadatak.status=false;
      })

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
        });
  }
  UpdateFizijatrijskiZadatak(item: GetAllZadatakResponseZadatak) {
    this.updateFizijatrijskiZadatak.zadatakId=item.zadatakId;
    this.updateFizijatrijskiZadatak.opis=item.opis;
    this.updateFizijatrijskiZadatak.status=item.status;
    this.updateFizijatrijskiZadatak.intervalZadatkaId=item.intervalZadatkaId;
    this.updateFizijatrijskiZadatak.zaposlenikPostavioId=item.zaposlenikPostavioId;
    this.updateFizijatrijskiZadatak.vrstaZadatkaId=item.vrstaZadatkaId;
    this.updateFizijatrijskiZadatak.datumPostavke=item.datumPostavke;
    this.updateFizijatrijskiZadatak.zaposlenikEditovaoId=this.getZaposlenik()?.zaposlenikId??null;
    this.updateFizijatrijskiZadatak.korisnikDomaId=this._korisnikDomaId;

    this.zadaciService.UpdateZadatak(this.updateFizijatrijskiZadatak).subscribe(
      () => {
        console.log("Medicinski zadatak updateovan")
      });
  }

  UpdateMedicinskiZadatak(item: GetAllZadatakResponseZadatak) {
    this.updateMedicinskiZadatak.zadatakId=item.zadatakId;
    this.updateMedicinskiZadatak.opis=item.opis;
    this.updateMedicinskiZadatak.status=item.status;
    this.updateMedicinskiZadatak.intervalZadatkaId=item.intervalZadatkaId;
    this.updateMedicinskiZadatak.zaposlenikPostavioId=item.zaposlenikPostavioId;
    this.updateMedicinskiZadatak.vrstaZadatkaId=item.vrstaZadatkaId;
    this.updateMedicinskiZadatak.datumPostavke=item.datumPostavke;
    this.updateMedicinskiZadatak.zaposlenikEditovaoId=this.getZaposlenik()?.zaposlenikId??null;
    this.updateMedicinskiZadatak.korisnikDomaId=this._korisnikDomaId;
    console.log(this.updateMedicinskiZadatak);
    this.zadaciService.UpdateZadatak(this.updateMedicinskiZadatak).subscribe(
      () => {
        console.log("Medicinski zadatak updateovan")
      });
  }
  RefreshOpstiZadaci() {
    let todayDate=new Date(this.odabraniDatum);

    this.zadaciService.GetAllZadaci().subscribe(x => {

      x.zadaci.forEach(y=> {

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
      this.opstiZadatak = this.zadaci.filter(zadatak =>
        zadatak.vrstaZadatkaId === this.OpstiZadatakId &&
        zadatak.korisnikDomaId === this._korisnikDomaId
      );
      this.medicinskiZadatak= this.zadaci.filter(zadatak =>
        zadatak.vrstaZadatkaId === this.MedicinskiZadatakId &&
        zadatak.korisnikDomaId === this._korisnikDomaId
      );
      this.fizijatrijskiZadatak= this.zadaci.filter(zadatak =>
        zadatak.vrstaZadatkaId === this.FizijatrijskiZadatakId &&
        zadatak.korisnikDomaId === this._korisnikDomaId
      );
    })
  }
   IzbrisiZadatak(item: GetAllZadatakResponseZadatak) {
      const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati zadatak?');
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.zadaciService.IzbrisiZadatak(item).pipe(
              finalize(() => {
                this.RefreshOpstiZadaci();
              })
          ).subscribe(
              request => () => {
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
  public dodajMedicinskiZadatak:DodajZadatakRequest={
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
    zaposlenikEditovaoId:null,
    intervalZadatkaId:0,
    vrstaZadatkaId:0,
    korisnikDomaId:0
  }
  showEmptyMed=false;
  DodajMedicinskiZadatak() {
    this.dodajMedicinskiZadatak.zaposlenikPostavioId=this.getZaposlenik()?.zaposlenikId??0;
    this.dodajMedicinskiZadatak.intervalZadatkaId=this.DnevniZadatakId;
    this.dodajMedicinskiZadatak.vrstaZadatkaId=this.MedicinskiZadatakId;
    this.dodajMedicinskiZadatak.korisnikDomaId=this._korisnikDomaId;
    if(this.dodajMedicinskiZadatak.opis!=="") {
      this.DodajZadatak(this.dodajMedicinskiZadatak);
    }
    else{
      this.showEmptyMed=true;
    }
  }
  public dodajFizijatrijskiZadatak:DodajZadatakRequest={
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
    zaposlenikEditovaoId:null,
    intervalZadatkaId:0,
    vrstaZadatkaId:0,
    korisnikDomaId:0
  }
  showEmptyFiz=false;
  DodajFizijatrijskiZadatak() {
    this.dodajFizijatrijskiZadatak.zaposlenikPostavioId=this.getZaposlenik()?.zaposlenikId??0;
    this.dodajFizijatrijskiZadatak.intervalZadatkaId=this.DnevniZadatakId;
    this.dodajFizijatrijskiZadatak.vrstaZadatkaId=this.FizijatrijskiZadatakId;
    this.dodajFizijatrijskiZadatak.korisnikDomaId=this._korisnikDomaId;
    if(this.dodajFizijatrijskiZadatak.opis!=="") {
      this.DodajZadatak(this.dodajFizijatrijskiZadatak);
    }
    else{
      this.showEmptyFiz=true;
    }
  }
}
