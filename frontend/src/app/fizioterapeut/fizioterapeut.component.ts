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



@Component({
  selector: 'app-fizioterapeut',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [FizioterapeutService],
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


  constructor(public httpClient: HttpClient,private dialog: MatDialog, private fizioterapeutService: FizioterapeutService, private fb: FormBuilder, private myAlert:AlertService) {

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

  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
      map((response)=>response.poslovnePozicije)
    )
  }


  Dodaj() {

    if (this.fizioterapeutForm.valid) {
      this.fizioterapeutService.DodajFizioterapeuta(this.fizioterapeutForm.value).subscribe((request: any) => {
        this.myAlert.showSuccess("Uspjesšno dodan fizioterapeut");
      });
    } else {
      this.myAlert.showError("Podaci za unos nisu validni");
    }
    this.OcistiFormu();
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
    this.fizioterapeutService.GetAllFizioterapeuti().subscribe(x=>{
      this.allFizioterapeuti = x.fizioterapeuti;
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
        this.fizioterapeutService.IzbrisiFizioterapeuta(item).subscribe(
          response => () => {
            this.myAlert.showSuccess("Uspješno obrisan fizioterapeut")
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
  Odaberi(item: FizioterapeutGetAllResponseFizioterapeut) {

    this.odabraniFizioterapeut = item;

    // Popunjavanje forme sa podacima odabranog fizioterapeuta
    this.updateForm.patchValue({
      imePrezime: this.odabraniFizioterapeut.imePrezime,
      jmbg: this.odabraniFizioterapeut.jmbg,
      datumRodjenja: this.odabraniFizioterapeut.datumRodjenja,
      datumZaposlenja: this.odabraniFizioterapeut.datumZaposlenja,
      oblastFizijatrije: this.odabraniFizioterapeut.oblastFizijatrije,
      poslovnaPozicijaId:this.odabraniFizioterapeut.poslovnaPozicijaId
    });
  }

    Update() {
      if (this.updateForm.invalid) {
        this.updateForm.markAllAsTouched();
        return;
      }

      if (this.odabraniFizioterapeut !== null) {
        this.odabraniFizioterapeut.imePrezime = this.updateForm.get('imePrezime')?.value || '';
        this.odabraniFizioterapeut.jmbg = this.updateForm.get('jmbg')?.value || '';
        this.odabraniFizioterapeut.datumRodjenja = this.updateForm.get('datumRodjenja')?.value || '';
        this.odabraniFizioterapeut.datumZaposlenja = this.updateForm.get('datumZaposlenja')?.value || '';
        this.odabraniFizioterapeut.oblastFizijatrije = this.updateForm.get('oblastFizijatrije')?.value || '';
        this.odabraniFizioterapeut.poslovnaPozicijaId=this.updateForm.get('poslovnaPozicijaId')?.value || '';

        this.fizioterapeutService.UpdateFizioterapeuta(this.odabraniFizioterapeut).subscribe(
          response => {
            this.myAlert.showSuccess("Uspješno ažuriran fizioterapeut");
            this.OcistiFormu();
            this.odabraniFizioterapeut=null;
          },
          error => {
            this.myAlert.showError("Greška prilikom ažuriranja fizioterapeuta");
          }
        );
      }
    }}
