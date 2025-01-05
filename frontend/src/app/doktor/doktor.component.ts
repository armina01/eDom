import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {DoktorRequest} from "./doktorRequest";
import {map, Observable} from "rxjs";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {MyConfig} from "../my-config";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DoktorGetAllResponse, DoktorGetAllResponseDoktor} from "./doktorGetAllResponse";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {DoktorUpdateRequest} from "./doktorUpdateRequest";
import {DoktorService} from "../Services/DoktorService";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AlertService} from "../Services/AlertService";
import {NjegovateljiService} from "../Services/NjegovateljService";
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {KorisnickiNalogRequest} from "../korisnicki-nalog/korisnickiNalogRequest";
import {NavBarDoktorComponent} from "../nav-bar-doktor/nav-bar-doktor.component";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-doktor',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, NavBarDoktorComponent, AlertComponent],
    providers: [DoktorService, KorisnickiNalogService],
  templateUrl: './doktor.component.html',
  styleUrl: './doktor.component.css'
})
export class DoktorComponent implements OnInit{

    doktorForm: FormGroup;
    updateForm: FormGroup;
    constructor(private fb: FormBuilder, public httpClient: HttpClient,private dialog: MatDialog, private doktorService: DoktorService,
                private myAlert:AlertService, public korisnickiNalogService : KorisnickiNalogService) {
      this.doktorForm = this.fb.group({
        imePrezime: ['', Validators.required],
        jmbg: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        datumRodjenja: ['', Validators.required],
        datumZaposlenja: ['', Validators.required],
        nazivKlinike: ['', Validators.required],
        oblastMedicine: ['', Validators.required],
        specijalizacija: ['', Validators.required],
        poslovnaPozicijaId: ['', Validators.required]
      });

      this.updateForm = this.fb.group({
        imePrezime: ['', Validators.required],
        jmbg: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        datumRodjenja: ['', Validators.required],
        datumZaposlenja: ['', Validators.required],
        nazivKlinike: ['', Validators.required],
        oblastMedicine: ['', Validators.required],
        specijalizacija: ['', Validators.required],
        poslovnaPozicijaId: ['', Validators.required]
      });
    }

    ngOnInit(): void {
        this.GetAllPoslovnaPozicija().subscribe((data)=>{
            this.poslovnePozicije=data;
        })

    }

    poslovnePozicije:GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]=[];
    allDoktori:DoktorGetAllResponseDoktor[]=[];
    public odabraniDoktor:DoktorGetAllResponseDoktor | null=null;
    public prikaziTabelu:boolean=false;
    showFirstForm: boolean = true;
    showError=false;
    prikaziErrorNalog:boolean=false
    zaposlenikUpdId:number=0;
    zaposlenikUpdNalog:boolean=false;

    public doktorRequest: DoktorRequest = {
    imePrezime: "",
    jmbg: "",
    datumRodjenja: "",
    datumZaposlenja: "",
    nalogId: null,
    poslovnaPozicijaId: 0,
    nazivKlinike: "",
    oblastMedicine: "",
    specijalizacija: ""

  }
  public korisnickiNalogRequest: KorisnickiNalogRequest = {
    korisnickoIme: "",
    lozinka: "",
    email:"",
    jeAdmin: false,
    jeDoktor: true,
    jeFizioterapeut: false,
    jeNjegovatelj: false,
    jeNutricionista: false,
    je2FActive:true,
  }

  public updateDoktorRequest: DoktorUpdateRequest = {
    zaposlenikId:0,
    imePrezime: "",
    jmbg: "",
    datumRodjenja: "",
    datumZaposlenja: "",
    nalogId: null,
    poslovnaPozicijaId: 0,
    nazivKlinike: "",
    oblastMedicine: "",
    specijalizacija: ""

  }
  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
      map((response)=>response.poslovnePozicije)
    )
  }


    Dodaj() {

      if (this.doktorForm.valid) {
        this.doktorRequest.imePrezime=this.doktorForm.get('imePrezime')?.value || '';
        this.doktorRequest.jmbg=this.doktorForm.get('jmbg')?.value || '';
        this.doktorRequest.datumRodjenja=this.doktorForm.get('datumRodjenja')?.value || '';
        this.doktorRequest.datumZaposlenja=this.doktorForm.get('datumZaposlenja')?.value || '';
        this.doktorRequest.poslovnaPozicijaId=this.doktorForm.get('poslovnaPozicijaId')?.value || '';
        this.doktorRequest.specijalizacija=this.doktorForm.get('specijalizacija')?.value || '';
        this.doktorRequest.oblastMedicine=this.doktorForm.get('oblastMedicine')?.value || '';
        this.doktorRequest.nazivKlinike=this.doktorForm.get('nazivKlinike')?.value || '';


        this.doktorService.DodajDoktora(this.doktorRequest).subscribe((request: any) => {
          this.myAlert.showSuccess("Doktor uspješno dodan");
          this.showFirstForm= false;
          this.zaposlenikUpdId=request.zaposlenikID;
        });
      } else {
        this.myAlert.showError("Podaci za unos nisu validni");
      }

    }


    GetAllDoktori() {

       this.doktorService.GetAllDoktori().subscribe(x=>{
         this.allDoktori = x.doktori;
       })

    }

    getAllDoktori() {
        return this.allDoktori;
    }
    IzbrisiDoktora(item: DoktorGetAllResponseDoktor) {
      const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.doktorService.IzbrisiDoktora(item).subscribe(
            response => () => {
              this.getAllDoktori(); // ili samo ispisat da je uspjesno izgrisano
              this.myAlert.showSuccess("Uspješno obrisan doktor");
            },
            (error: any) => {
              console.error('Error:', error);

              if (error.status === 500) {
                this.myAlert.showError('Nije moguće izbrisati ovaj korisnički nalog');
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
    Odaberi(item: DoktorGetAllResponseDoktor) {

      this.odabraniDoktor = item;

      const formattedDatumRodjenja = this.formatDate(item.datumRodjenja);
      const formattedDatumZaposlenja = this.formatDate(item.datumZaposlenja);

      this.updateForm.patchValue({
        imePrezime: this.odabraniDoktor.imePrezime,
        jmbg: this.odabraniDoktor.jmbg,
        datumRodjenja: formattedDatumRodjenja,
        datumZaposlenja: formattedDatumZaposlenja,
        nazivKlinike: this.odabraniDoktor.nazivKlinike,
        oblastMedicine: this.odabraniDoktor.oblastMedicine,
        specijalizacija: this.odabraniDoktor.specijalizacija,
        poslovnaPozicijaId:this.odabraniDoktor.poslovnaPozicijaId
      });

    }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' koristi format yyyy-MM-dd
  }

  Update() {

      if(this.zaposlenikUpdNalog) {
        this.updateDoktorRequest.zaposlenikId = this.zaposlenikUpdId;
        this.updateDoktorRequest.imePrezime = this.doktorRequest.imePrezime;
        this.updateDoktorRequest.jmbg = this.doktorRequest.jmbg;
        this.updateDoktorRequest.datumRodjenja = this.doktorRequest.datumRodjenja;
        this.updateDoktorRequest.datumZaposlenja = this.doktorRequest.datumZaposlenja;
        this.updateDoktorRequest.nazivKlinike = this.doktorRequest.nazivKlinike;
        this.updateDoktorRequest.oblastMedicine = this.doktorRequest.oblastMedicine;
        this.updateDoktorRequest.specijalizacija = this.doktorRequest.specijalizacija;
        this.updateDoktorRequest.poslovnaPozicijaId = this.doktorRequest.poslovnaPozicijaId;


        this.doktorService.UpdateDoktora(this.updateDoktorRequest).subscribe(
          response => {
            this.myAlert.showSuccess("Uspješno ažuriran doktor");
            this.doktorForm.reset();
            this.zaposlenikUpdNalog=false;
            this.showFirstForm = true;
            this.ngOnInit();
          },
          error => {
            this.myAlert.showError("Greška prilikom ažuriranja");
          }
        );

      }else {

        if (this.updateForm.invalid) {
          this.updateForm.markAllAsTouched();
          return;
        }

        if (this.odabraniDoktor !== null) {
          this.updateDoktorRequest.zaposlenikId = this.odabraniDoktor.zaposlenikId;
          this.updateDoktorRequest.imePrezime = this.updateForm.get('imePrezime')?.value || '';
          this.updateDoktorRequest.jmbg = this.updateForm.get('jmbg')?.value || '';
          this.updateDoktorRequest.datumRodjenja = this.updateForm.get('datumRodjenja')?.value || '';
          this.updateDoktorRequest.datumZaposlenja = this.updateForm.get('datumZaposlenja')?.value || '';
          this.updateDoktorRequest.nazivKlinike = this.updateForm.get('nazivKlinike')?.value || '';
          this.updateDoktorRequest.oblastMedicine = this.updateForm.get('oblastMedicine')?.value || '';
          this.updateDoktorRequest.specijalizacija = this.updateForm.get('specijalizacija')?.value || '';
          this.updateDoktorRequest.poslovnaPozicijaId = this.updateForm.get('poslovnaPozicijaId')?.value || '';
          this.updateDoktorRequest.nalogId=this.odabraniDoktor.nalogId;

          this.doktorService.UpdateDoktora(this.updateDoktorRequest).subscribe(
            response => {
              this.myAlert.showSuccess("Uspješno ažuriran doktor");
              this.OcistiFormu();
              this.odabraniDoktor = null;
              this.ngOnInit();
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
    this.korisnickiNalogService.DodajKorisnickiNalog( this.korisnickiNalogRequest).subscribe(request => {
      this.prikaziErrorNalog=false;
      this.showError=false;
      this.updateDoktorRequest.nalogId = request.korisnikId
      this.zaposlenikUpdNalog=true;
      this.Update();

    },(error: any) => {
      console.error("err", error);
      this.prikaziErrorNalog=true;
    })
  }
  OcistiFormu(): void {
    this.updateForm.reset();

  }

  Prikazi() {
    this.GetAllDoktori();
    this.prikaziTabelu=true;
  }




}

