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

@Component({
  selector: 'app-pregled-napomena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pregled-napomena.component.html',
  styleUrl: './pregled-napomena.component.css'
})
export class PregledNapomenaComponent implements OnInit{

  public korisnikId:number=0;
  public napomeneAll:NapomenaGetAllResponseNapomena[]=[];
  public odabraneNapomene: NapomenaGetAllResponseNapomena[]=[];
  public zaposlenici:ZaposlenikGetAllRsponseZaposlenik[]=[];
  public vrsteNapomena:VrstaNapomeneGetAllResponseVrstaNapomene[]=[];
  public OdabranaNapomena: NapomenaGetAllResponseNapomena | null=null



    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.korisnikId = +params['id'];
      });
      this.GetAllNpomene();
      this.getVrsteNapomene();
      this.GetAllZaposlenike();

    }
    constructor(public httpClient:HttpClient, private dialog: MatDialog, public route: ActivatedRoute) {
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
    let url = MyConfig.adresa_servera + `/vrstaNapomene/getAll`
    this.httpClient.get<VrstaNapomeneGetAllResponse>(url).subscribe((x: VrstaNapomeneGetAllResponse) => {
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
    let url =MyConfig.adresa_servera +`/napomena/getAll`
    this.httpClient.get<NapomenaGetAllResponse>(url).subscribe((x:NapomenaGetAllResponse)=>{
      this.napomeneAll = x.napomene;
      this.odabraneNapomene=this.napomeneAll.filter(x=>x.korisnikDomaID===this.korisnikId);
      console.log(this.odabraneNapomene);

    })
  }

  Obrisi(item: NapomenaGetAllResponseNapomena) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati napomenu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/napomena/obrisi`;
        const params = new HttpParams().set('napomenaId', item.napomenaId);
        this.httpClient.delete(url, {params}).subscribe(
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
      this.ngOnInit();
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
    let url: string = MyConfig.adresa_servera + `/napomena/update`;
    console.log(this.napomenaUpdateRequest)
    this.httpClient.post(url, this.napomenaUpdateRequest).subscribe(request => {
      console.log("Napomena updateovana ", request)
    })
    this.OdabranaNapomena=null;
    setTimeout(() => {
      this.ngOnInit();
    }, 5000);
  }

}
