import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {MyConfig} from "../my-config";
import {NapomenaGetAllResponse, NapomenaGetAllResponseNapomena} from "./napomenaGetAllResponse";
import {
  VrstaNapomeneGetAllResponse,
  VrstaNapomeneGetAllResponseVrstaNapomene
} from "../napomena/vrstaNapomeneGetAllResponse";
import {ZaposlenikGetAllRsponse, ZaposlenikGetAllRsponseZaposlenik} from "./zaposlenikGetAllRsponse";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NapomenaService} from "../Services/NapomenaService";
import {AlertService} from "../Services/AlertService";
import {NavBarDoktorComponent} from "../nav-bar-doktor/nav-bar-doktor.component";
import {MyAuthService} from "../Services/MyAuthService";
import {NavBarNjejgovateljComponent} from "../nav-bar-njejgovatelj/nav-bar-njejgovatelj.component";
import {NavBarNutricionistaComponent} from "../nav-bar-nutricionista/nav-bar-nutricionista.component";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";

@Component({
  selector: 'app-pregled-napomena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavBarDoktorComponent, NavBarNjejgovateljComponent, NavBarNutricionistaComponent],
  providers: [NapomenaService],
  templateUrl: './pregled-napomena.component.html',
  styleUrl: './pregled-napomena.component.css'
})
export class PregledNapomenaComponent implements OnInit{

  jeDoktor=false;
  jeNjegovatelj= false;
  public korisnikId:number=0;
  public napomeneAll:NapomenaGetAllResponseNapomena[]=[];
  public odabraneNapomene: NapomenaGetAllResponseNapomena[]=[];
  public zaposlenici:ZaposlenikGetAllRsponseZaposlenik[]=[];
  public vrsteNapomena:VrstaNapomeneGetAllResponseVrstaNapomene[]=[];
  public OdabranaNapomena: NapomenaGetAllResponseNapomena | null=null
  korisnik:KorisnikDomaGetAllResponseKorisnik|undefined=undefined;


    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.korisnikId = +params['id'];
      });
      if(this._myAuthService.jeDoktor())
      {
        this.jeDoktor=true;
      }
      if(this._myAuthService.jeNjegovatelj())
      {
        this.jeNjegovatelj=true;
      }
      this.GetAllNpomene();
      this.getVrsteNapomene();
      this.GetAllZaposlenike();
      this.PronadjiKorisnika();
    }
    constructor(public httpClient:HttpClient, private dialog: MatDialog, public route: ActivatedRoute, private napomenaService: NapomenaService, private myAlert:AlertService, private _myAuthService:MyAuthService) {
    }
  PronadjiKorisnika(){
    let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x:KorisnikDomaGetAllResponse)=>{
      this.korisnik=x.korisnici.find(x=>x.korisnikDomaID===this.korisnikId) ;
    })

  }
    public napomenaUpdateRequest:NapomenaGetAllResponseNapomena={
      napomenaId:0,
      opis:"",
      datumPostavke:new Date(),
      isAktivna:false,
      prioritet:false,
      zaposlenikId:0,
      vrstaNapomeneId:0,
      korisnikDomaID:0
    }

  getVrsteNapomene() {
    this.napomenaService.GetVrsteNapomena().subscribe(x=>{
      this.vrsteNapomena=x.vrsteNapomena;
    })
  }
  GetAllZaposlenike()
  {
    let url: string = MyConfig.adresa_servera + `/getAllZaposlenici`;
    this.httpClient.get<ZaposlenikGetAllRsponse>(url).subscribe(x => {
      this.zaposlenici = x.zaposlenici;
    })
  }
  public GetAllNpomene()
  {
    this.napomenaService.GetAllNapomene().subscribe(x=>{
      this.napomeneAll = x.napomene;
      this.odabraneNapomene=this.napomeneAll.filter(x=>x.korisnikDomaID===this.korisnikId);
      console.log(this.odabraneNapomene);
    });
  }

  Obrisi(item: NapomenaGetAllResponseNapomena) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati napomenu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.napomenaService.IzbrisiNapomenu(item).subscribe(
          response => () => {
            console.log("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati ovu napomenu');
              console.error('Handle 500 error here');
            } else {
              // Handle other errors
              alert('An error occurred.');
            }
          })
      }
      setTimeout(() => {
        this.ngOnInit();
      }, 3000);
    });
  }

  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };



  Odaberi(item: NapomenaGetAllResponseNapomena) {
    this.OdabranaNapomena={
      napomenaId:item.napomenaId,
      opis:item.opis,
      prioritet:item.prioritet,
      datumPostavke:item.datumPostavke,
      isAktivna:item.isAktivna,
      zaposlenikId:item.zaposlenikId,
      korisnikDomaID:item.korisnikDomaID,
      vrstaNapomeneId:item.vrstaNapomeneId
    };
  }

  Update() {
    if(this.OdabranaNapomena)
    {
      this.napomenaUpdateRequest={
        napomenaId:this.OdabranaNapomena.napomenaId,
        opis:this.OdabranaNapomena.opis,
        prioritet:this.OdabranaNapomena.prioritet,
        datumPostavke:this.OdabranaNapomena.datumPostavke,
        isAktivna:this.OdabranaNapomena.isAktivna,
        zaposlenikId:this.OdabranaNapomena.zaposlenikId,
        korisnikDomaID:this.OdabranaNapomena.korisnikDomaID,
        vrstaNapomeneId:this.OdabranaNapomena.vrstaNapomeneId
      };
    }
    console.log(this.napomenaUpdateRequest)
    this.napomenaService.UpdateNapomenu(this.napomenaUpdateRequest).subscribe(request => {
      this.myAlert.showSuccess("Napomena uspješno ažurirana")
    })
    this.OdabranaNapomena=null;
    setTimeout(() => {
      this.ngOnInit();
    }, 3000);
  }

  getNazivVrste(item: NapomenaGetAllResponseNapomena) {
    const vrstaNapomene = this.vrsteNapomena.find(n => n.vrstaNapomeneId === item.vrstaNapomeneId);
    return vrstaNapomene ? vrstaNapomene.opis : undefined;
  }

  getImeZaposlenika(zaposlenikId: number) {
    const zaposlenik = this.zaposlenici.find(n => n.zaposlenikId===zaposlenikId);
    return zaposlenik ? zaposlenik.imePrezime : undefined;
  }


}
