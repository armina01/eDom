import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {NapomenaGetAllResponse, NapomenaGetAllResponseNapomena} from "../pregled-napomena/napomenaGetAllResponse";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ZaposlenikGetAllRsponse, ZaposlenikGetAllRsponseZaposlenik} from "../pregled-napomena/zaposlenikGetAllRsponse";
import {
  VrstaNapomeneGetAllResponse,
  VrstaNapomeneGetAllResponseVrstaNapomene
} from "../napomena/vrstaNapomeneGetAllResponse";
import {NapomenaService} from "../Services/NapomenaService";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {AlertService} from "../Services/AlertService";
import {FormsModule} from "@angular/forms";
import {NavBarDoktorComponent} from "../nav-bar-doktor/nav-bar-doktor.component";
import {MyAuthService} from "../Services/MyAuthService";
import {NavBarNjejgovateljComponent} from "../nav-bar-njejgovatelj/nav-bar-njejgovatelj.component";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-pregled-aktivnih-napomena',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, NavBarDoktorComponent, NavBarNjejgovateljComponent],
  providers: [NapomenaService],
  templateUrl: './pregled-aktivnih-napomena.component.html',
  styleUrl: './pregled-aktivnih-napomena.component.css'
})
export class PregledAktivnihNapomenaComponent implements OnInit{

  jeNjegovatelj=false;
  jeNutricionista=false;
  jeDoktor=false;

  public napomeneAll:NapomenaGetAllResponseNapomena[]=[];
  public odabraneNapomene: NapomenaGetAllResponseNapomena[]=[];
  public aktivneNapomene: NapomenaGetAllResponseNapomena[]=[];
  public zaposlenici:ZaposlenikGetAllRsponseZaposlenik[]=[];
  public korisnikId:number=0;
  public vrsteNapomena:VrstaNapomeneGetAllResponseVrstaNapomene[]=[];
  public OdabranaNapomena: NapomenaGetAllResponseNapomena | null=null
  korisnik:KorisnikDomaGetAllResponseKorisnik|undefined=undefined;
    ngOnInit(): void {

        this.GetAllNapomene();
        this.getVrsteNapomene();
        this.GetAllZaposlenike();
      if(this._myAuthService.jeNjegovatelj())
      {
        this.jeNjegovatelj=true;
      }else if (this._myAuthService.jeNutricionista()) {
        this.jeNutricionista=true;
      }else if(this._myAuthService.jeDoktor())
      {
        this.jeDoktor=true;
      }
      console.log(this.jeNjegovatelj,this.jeDoktor, this.jeNutricionista);
      this.PronadjiKorisnika();
    }
   constructor(public httpClient:HttpClient, private dialog: MatDialog, public route: ActivatedRoute,
               private napomenaService: NapomenaService, private myAlert:AlertService, private _myAuthService: MyAuthService) {
     this.route.params.subscribe(params => {
       this.korisnikId = +params['id'];
     });
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
  public GetAllNapomene() {
    this.napomenaService.GetAllNapomene().subscribe((x: NapomenaGetAllResponse) => {
      this.napomeneAll = x.napomene;
      this.odabraneNapomene = this.napomeneAll.filter(x => x.korisnikDomaID === this.korisnikId);
      console.log(this.odabraneNapomene);
      this.GetAktivneNapomene();

    })
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

  GetAktivneNapomene()
  {
    this.aktivneNapomene=this.odabraneNapomene.filter(item => item.isAktivna==true);
    return this.aktivneNapomene;
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

    this.napomenaService.UpdateNapomenu(this.napomenaUpdateRequest).subscribe(request => {
      this.myAlert.showSuccess("Napomena uspješno ažurirana")
    })
    this.OdabranaNapomena=null;
    setTimeout(() => {
      this.ngOnInit();
    }, 3000);
  }

  getImeZaposlenika(zaposlenikId: number) {
    const zaposlenik = this.zaposlenici.find(n => n.zaposlenikId===zaposlenikId);
    return zaposlenik ? zaposlenik.imePrezime : undefined;
  }

}
