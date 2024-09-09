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

@Component({
  selector: 'app-doktor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [DoktorService],
  templateUrl: './doktor.component.html',
  styleUrl: './doktor.component.css'
})
export class DoktorComponent implements OnInit{

    doktorForm: FormGroup;
    updateForm: FormGroup;
    constructor(private fb: FormBuilder, public httpClient: HttpClient,private dialog: MatDialog, private doktorService: DoktorService, private myAlert:AlertService) {
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
        this.doktorService.DodajDoktora(this.doktorForm.value).subscribe((request: any) => {
          this.myAlert.showSuccess("Doktor uspješno dodan");
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
      });
    }

  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };
    Odaberi(item: DoktorGetAllResponseDoktor) {

      this.odabraniDoktor = item;

      this.updateForm.patchValue({
        imePrezime: this.odabraniDoktor.imePrezime,
        jmbg: this.odabraniDoktor.jmbg,
        datumRodjenja: this.odabraniDoktor.datumRodjenja,
        datumZaposlenja: this.odabraniDoktor.datumZaposlenja,
        nazivKlinike: this.odabraniDoktor.nazivKlinike,
        oblastMedicine: this.odabraniDoktor.oblastMedicine,
        specijalizacija: this.odabraniDoktor.specijalizacija,
        poslovnaPozicijaId:this.odabraniDoktor.poslovnaPozicijaId
      });

    }

  Update() {

    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    if (this.odabraniDoktor !== null) {
      this.odabraniDoktor.imePrezime = this.updateForm.get('imePrezime')?.value || '';
      this.odabraniDoktor.jmbg = this.updateForm.get('jmbg')?.value || '';
      this.odabraniDoktor.datumRodjenja = this.updateForm.get('datumRodjenja')?.value || '';
      this.odabraniDoktor.datumZaposlenja = this.updateForm.get('datumZaposlenja')?.value || '';
      this.odabraniDoktor.nazivKlinike = this.updateForm.get('nazivKlinike')?.value || '';
      this.odabraniDoktor.oblastMedicine = this.updateForm.get('oblastMedicine')?.value || '';
      this.odabraniDoktor.specijalizacija = this.updateForm.get('specijalizacija')?.value || '';
      this.odabraniDoktor.poslovnaPozicijaId=this.updateForm.get('poslovnaPozicijaId')?.value || '';


      this.doktorService.UpdateDoktora(this.odabraniDoktor).subscribe(
        response => {
          this.myAlert.showSuccess("Uspješno ažuriran doktor");
          this.OcistiFormu();
          this.odabraniDoktor=null;
        },
        error => {
          this.myAlert.showError("Greška prilikom ažuriranja");
        }
      );
    }
  }

  OcistiFormu(): void {
    this.updateForm.reset();
  }

  Prikazi() {
    this.GetAllDoktori();
    this.prikaziTabelu=true;
  }
}
