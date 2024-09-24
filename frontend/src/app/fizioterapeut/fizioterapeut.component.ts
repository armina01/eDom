import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {map, Observable} from "rxjs";
import {MyConfig} from "../my-config";
import {FizioterapeutDodajRequest} from "./fizioterapeutDodajRequest";
import {
  FizioterapeutGetAllResponseFizioterapeut, FizioterapeutGetAllResponse,
} from "./fizioterapeutGetAll";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {FizioterapeutUpdateRequest} from "./fizioterapeutUpdateRequest";
import {FizioterapeutService} from "../Services/FizioterapeutService";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AlertService} from "../Services/AlertService";
import {KorisnickiNalogRequest} from "../korisnicki-nalog/korisnickiNalogRequest";
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {AlertComponent} from "../alert/alert.component";



@Component({
  selector: 'app-fizioterapeut',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertComponent],
    providers: [FizioterapeutService, KorisnickiNalogService],
  templateUrl: './fizioterapeut.component.html',
  styleUrl: './fizioterapeut.component.css'
})
export class FizioterapeutComponent implements OnInit {

  fizioterapeutForm: FormGroup;
  updateForm: FormGroup;


  public poslovnePozicije: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]=[];
  public allFizioterapeuti: FizioterapeutGetAllResponseFizioterapeut[]=[];
  public odabraniFizioterapeut: FizioterapeutGetAllResponseFizioterapeut | null = null;
  public prikaziTabelu:boolean=false;
  showFirstForm: boolean = true;
  showError=false;
  prikaziErrorNalog:boolean=false
  zaposlenikUpdId:number=0;
  zaposlenikUpdNalog:boolean=false;


  constructor(public httpClient: HttpClient,private dialog: MatDialog,
              private fizioterapeutService: FizioterapeutService,
              private fb: FormBuilder, private myAlert:AlertService,
              public korisnickiNalogService : KorisnickiNalogService) {
    this.fizioterapeutForm = this.fb.group({
      imePrezime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      datumRodjenja: ['', Validators.required],
      datumZaposlenja: ['', Validators.required],
      oblastFizijatrije: ['', Validators.required],
      poslovnaPozicijaId: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      imePrezime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      datumRodjenja: ['', Validators.required],
      datumZaposlenja: ['', Validators.required],
      oblastFizijatrije: ['', Validators.required],
      poslovnaPozicijaId: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.GetAllPoslovnaPozicija().subscribe((data)=>{
      this.poslovnePozicije=data;
    })
  }

  public fizioterapeutRequest: FizioterapeutDodajRequest={
    imePrezime: "",
    jmbg: "",
    datumRodjenja: "",
    datumZaposlenja: "",
    nalogId:  null,
    poslovnaPozicijaId: 0,
    oblastFizijatrije: ""
  }
    public fizioterapeutUpdateRequest: FizioterapeutUpdateRequest={
        zaposlenikId:0,
        imePrezime: "",
        jmbg: "",
        datumRodjenja: "",
        datumZaposlenja: "",
        nalogId:  null,
        poslovnaPozicijaId: 0,
        oblastFizijatrije: ""
    }

  public korisnickiNalogRequest: KorisnickiNalogRequest = {
    korisnickoIme: "",
    lozinka: "",
    email:"",
    jeAdmin: false,
    jeDoktor: false,
    jeFizioterapeut: true,
    jeNjegovatelj: false,
    jeNutricionista: false,
    je2FActive:true,
  }
  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
      map((response)=>response.poslovnePozicije)
    )
  }


  Dodaj() {

    if (this.fizioterapeutForm.valid) {

      this.fizioterapeutRequest.imePrezime=this.fizioterapeutForm.get('imePrezime')?.value || '';
      this.fizioterapeutRequest.jmbg=this.fizioterapeutForm.get('jmbg')?.value || '';
      this.fizioterapeutRequest.datumRodjenja=this.fizioterapeutForm.get('datumRodjenja')?.value || '';
      this.fizioterapeutRequest.datumZaposlenja=this.fizioterapeutForm.get('datumZaposlenja')?.value || '';
      this.fizioterapeutRequest.poslovnaPozicijaId=this.fizioterapeutForm.get('poslovnaPozicijaId')?.value || '';
      this.fizioterapeutRequest.oblastFizijatrije=this.fizioterapeutForm.get('oblastFizijatrije')?.value || '';


      this.fizioterapeutService.DodajFizioterapeuta(this.fizioterapeutRequest).subscribe((request: any) => {
        this.myAlert.showSuccess("Uspjesšno dodan fizioterapeut");
        this.showFirstForm= false;
        this.zaposlenikUpdId=request.zaposlenikID;

      });
    } else {
      this.myAlert.showError("Podaci za unos nisu validni");
    }

  }

  OcistiFormu(){
    this.fizioterapeutRequest.imePrezime="";
    this.fizioterapeutRequest.jmbg="";
    this.fizioterapeutRequest.datumZaposlenja="";
    this.fizioterapeutRequest.datumRodjenja="";
    this.fizioterapeutRequest.oblastFizijatrije="";
    this.fizioterapeutRequest.poslovnaPozicijaId=0
  }
  GetAllFizioterapeuti() {
    this.fizioterapeutService.GetAllFizioterapeuti().subscribe(x => {
      this.allFizioterapeuti= x.fizioterapeuti
    })
  }

  getAllFizioterapeuti() {
    return this.allFizioterapeuti
  }
  Prikazi() {
     this.GetAllFizioterapeuti();
     this.prikaziTabelu=true;
  }

  IzbrisiFizioterapeuta(item: FizioterapeutGetAllResponseFizioterapeut) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/Fizioterapeut-obrisi`;
        const params = new HttpParams().set('ZaposlenikId', item.zaposlenikId);
        this.httpClient.delete(url, {params}).subscribe(
          response => () => {
            alert("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati ovaj korisnički nalog');
              console.error('Handle 500 error here');
            } else {
              // Handle other errors
              alert('An error occurred.');
            }
          })
      }
      setTimeout(() => {
        this.Prikazi();
      }, 3000);
    });
  }

    openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
        return this.dialog.open(WarningDialogComponent, {
            data: {message},
        });
    };
  Odaberi(item: FizioterapeutGetAllResponseFizioterapeut) {
    this.odabraniFizioterapeut = item;

    const formattedDatumRodjenja = this.formatDate(item.datumRodjenja);
    const formattedDatumZaposlenja = this.formatDate(item.datumZaposlenja);

    this.updateForm.patchValue({
      imePrezime: this.odabraniFizioterapeut.imePrezime,
      jmbg: this.odabraniFizioterapeut.jmbg,
      datumRodjenja: formattedDatumRodjenja,
      datumZaposlenja: formattedDatumZaposlenja,
      poslovnaPozicijaId:this.odabraniFizioterapeut.poslovnaPozicijaId,
      oblastFizijatrije: this.odabraniFizioterapeut.oblastFizijatrije
    });

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' koristi format yyyy-MM-dd
  }
  Update() {

    if(this.zaposlenikUpdNalog) {
      this.fizioterapeutUpdateRequest.zaposlenikId = this.zaposlenikUpdId;
      this.fizioterapeutUpdateRequest.imePrezime = this.fizioterapeutRequest.imePrezime;
      this.fizioterapeutUpdateRequest.jmbg = this.fizioterapeutRequest.jmbg;
      this.fizioterapeutUpdateRequest.datumRodjenja = this.fizioterapeutRequest.datumRodjenja;
      this.fizioterapeutUpdateRequest.datumZaposlenja = this.fizioterapeutRequest.datumZaposlenja;
      this.fizioterapeutUpdateRequest.oblastFizijatrije = this.fizioterapeutRequest.oblastFizijatrije;
      this.fizioterapeutUpdateRequest.poslovnaPozicijaId = this.fizioterapeutRequest.poslovnaPozicijaId;

      console.log(this.fizioterapeutUpdateRequest);
      this.fizioterapeutService.UpdateFizioterapeuta(this.fizioterapeutUpdateRequest).subscribe(
          response => {
            this.myAlert.showSuccess("Uspješno ažuriran fizioterapeut");
            this.showFirstForm = true;
            this.ngOnInit();
          },
          error => {
            this.myAlert.showError("Greška prilikom ažuriranja");
          }
      );
    }
    else {
      if (this.updateForm.invalid) {
        this.updateForm.markAllAsTouched();
        return;
      }

      if (this.odabraniFizioterapeut !== null) {
        this.fizioterapeutUpdateRequest.zaposlenikId = this.odabraniFizioterapeut.zaposlenikId;
        this.fizioterapeutUpdateRequest.imePrezime = this.updateForm.get('imePrezime')?.value || '';
        this.fizioterapeutUpdateRequest.jmbg = this.updateForm.get('jmbg')?.value || '';
        this.fizioterapeutUpdateRequest.datumRodjenja = this.updateForm.get('datumRodjenja')?.value || '';
        this.fizioterapeutUpdateRequest.datumZaposlenja = this.updateForm.get('datumZaposlenja')?.value || '';
        this.fizioterapeutUpdateRequest.oblastFizijatrije = this.updateForm.get('oblastFizijatrije')?.value || '';
        this.fizioterapeutUpdateRequest.poslovnaPozicijaId = this.updateForm.get('poslovnaPozicijaId')?.value || '';
        this.fizioterapeutUpdateRequest.nalogId = this.odabraniFizioterapeut.nalogId;


        this.fizioterapeutService.UpdateFizioterapeuta(this.fizioterapeutUpdateRequest).subscribe(
            response => {
              this.myAlert.showSuccess("Uspješno ažuriran fizioterapeut");
              this.OcistiFormu();
              this.odabraniFizioterapeut = null;
            },
            error => {
              this.myAlert.showError("Greška prilikom ažuriranja");
            }
        );
      }
    }
    setTimeout(() => {
      this.Prikazi();
    }, 3000);
  }
  AddKorisnickiNalog(): void {
    console.log(this.korisnickiNalogRequest);
    this.korisnickiNalogService.DodajKorisnickiNalog( this.korisnickiNalogRequest).subscribe(request => {
      this.prikaziErrorNalog=false;
      this.showError=false;
      this.fizioterapeutUpdateRequest.nalogId = request.korisnikId
      this.zaposlenikUpdNalog=true;
      this.Update();
    },(error: any) => {
      console.error("err", error);
      this.prikaziErrorNalog=true;
    })
  }

}
