import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DijagnozaRequest} from "./dijagnozaRequest";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {MyConfig} from "../my-config";
import {DoktorGetAllResponse, DoktorGetAllResponseDoktor} from "../doktor/doktorGetAllResponse";
import {DijagnozaGetAllResponse, DijagnozaGetAllResponseDijagnoza} from "./dijagnozaGetAllResponse";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {KorisnikDomaService} from "../Services/KorisnikDomaService";
import {MyAuthService} from "../Services/MyAuthService";
import {SignalRService} from "../Services/signalR.service";
import {DoktorService} from "../Services/DoktorService";
import {DijagnozaService} from "../Services/DijagnozaService";
import {DijagnozaUpdateRequest} from "./DijagnozaUpdateRequest";
import {AlertService} from "../Services/AlertService";
import {NavBarDoktorComponent} from "../nav-bar-doktor/nav-bar-doktor.component";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-dijagnoza',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarDoktorComponent, AlertComponent],
  providers:[KorisnikDomaService, DoktorService, DijagnozaService],
  templateUrl: './dijagnoza.component.html',
  styleUrl: './dijagnoza.component.css'
})
export class DijagnozaComponent implements  OnInit{

  korisniciDoma: KorisnikDomaGetAllResponseKorisnik[]=[];
  doktori: DoktorGetAllResponseDoktor[]=[];
  public dijagnoze: DijagnozaGetAllResponseDijagnoza[]=[];
  pretragaPoKorisniku: number=0;
  filtriraneDijagnoze:DijagnozaGetAllResponseDijagnoza[]=[];
  public odabranaDijagnoza: DijagnozaGetAllResponseDijagnoza | null = null;
  public showConfirmationDialog:boolean=false;

  fileSelected = false;
  selectedFile: File | null = null;
  dijagnozaForm: FormGroup;
  updateForm:FormGroup;
  zaposlenikId:number=0;


  constructor(public httpClient: HttpClient, private dialog: MatDialog, private korisnikDomaService:KorisnikDomaService, private doktorService: DoktorService, private dijagnozaService: DijagnozaService, private fb: FormBuilder, private myAlert:AlertService) {
    this.dijagnozaForm = this.fb.group({
      nazivBolesti: ['', Validators.required],
      opis: ['', Validators.required],
      datumDijagnoze: ['', Validators.required],
      korisnikDomaID: ['', Validators.required],
    });

    this.updateForm = this.fb.group({
      nazivBolesti: ['', Validators.required], // string
      opis: ['', Validators.required], // string
      datumDijagnoze: ['', Validators.required],

    });
  }
    ngOnInit(): void {

      this.GetAllDoktore();
      this.GetAllKorisnike();
      this.GetAllDijagnoze();

    }

  public dijagnozaRequest: DijagnozaRequest = {
    nazivBolesti: "",
    opis: "",
    datumDijagnoze: new Date(),
    zaposlenikId: 0,
    korisnikDomaID: 0,
    nalazFile:this.selectedFile

  }
  public dijagnozaUpdateRequest: DijagnozaUpdateRequest={
    nazivBolesti: "",
    opis: "",
    datumDijagnoze: new Date(),
    zaposlenikId: 0,
    korisnikDomaID: 0,
    nalazFile:this.selectedFile
  }

  GetAllKorisnike()
  {
    this.korisnikDomaService.GetAllKorisnici().subscribe((data)=>{
      this.korisniciDoma=data.korisnici;
    });
  }

  GetAllDoktore()
  {
    this.doktorService.GetAllDoktori().subscribe((data)=>{
      this.doktori=data.doktori;
    });
  }

  Dodaj() {

    const korisnikString = window.localStorage.getItem('korisnik');

    let korisnikObjekat = korisnikString ? JSON.parse(korisnikString) : null;
    this.zaposlenikId = korisnikObjekat ? korisnikObjekat.zaposlenikId : this.zaposlenikId;
    if (this.dijagnozaForm.valid) {

      const formData: FormData = new FormData();
      formData.append('nazivBolesti', this.dijagnozaForm.get('nazivBolesti')!.value);
      formData.append('opis', this.dijagnozaForm.get('opis')!.value);
      formData.append('datumDijagnoze', this.dijagnozaForm.get('datumDijagnoze')!.value.toString());
      formData.append('zaposlenikId', this.zaposlenikId.toString());
      formData.append('korisnikDomaID', this.dijagnozaForm.get('korisnikDomaID')!.value.toString());

      if (this.dijagnozaRequest.nalazFile) {
        formData.append('file', this.dijagnozaRequest.nalazFile);
      }

      this.dijagnozaService.DodajDijagozu(formData).subscribe(x => {
        this.myAlert.showSuccess("Uspješno dodana dijagnoza");

      });
      setTimeout(() => {
        this.GetAllDijagnoze();
      }, 3000);
      //this.showConfirmationDialog = true;
      //this.setAutoHide();
    }

  }

  setAutoHide() {
    setTimeout(() => {
      this.showConfirmationDialog = false;
    }, 3000);
  }

  GetAllDijagnoze() {
    this.dijagnozaService.GetAllDijagnoze().subscribe(x=>{
      this.dijagnoze=x.dijagnoze;
    });
  }

  getFiltriraneDijagnoze() {
    this.filtriraneDijagnoze = this.dijagnoze.filter(x => x.korisnikDomaID == this.pretragaPoKorisniku);

    return this.filtriraneDijagnoze;

  }


  Obrisi(item: DijagnozaGetAllResponseDijagnoza) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati dijagnozu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dijagnozaService.IzbrisiDijagnozu(item).subscribe(
          response => () => {
            this.myAlert.showSuccess("Uspješno obrisana dijagnoza")

          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              this.myAlert.showError('Nije moguće izbrisati ovu dijagnozu');
              console.error('Handle 500 error here');
            } else {
              // Handle other errors
              alert('An error occurred.');
            }
          })
      }
      setTimeout(() => {
        this.GetAllDijagnoze();
      }, 3000);
    });
  }

  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };


  Odaberi(item: DijagnozaGetAllResponseDijagnoza) {

    this.odabranaDijagnoza = item;
    const datumDijagnoze = this.odabranaDijagnoza.datumDijagnoze;
    const formattedDatumDijagnoze = this.formatDate(datumDijagnoze);

    this.updateForm.patchValue({
      nazivBolesti: this.odabranaDijagnoza.nazivBolesti,
      opis: this.odabranaDijagnoza.opis,
      datumDijagnoze:formattedDatumDijagnoze,

    });

  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Vraća datum u formatu yyyy-MM-dd
  }

  Update() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    if (this.odabranaDijagnoza !== null) {

      const formData: FormData = new FormData();
      formData.append('dijagnozaId', this.odabranaDijagnoza.dijagnozaId.toString());
      formData.append('nazivBolesti', this.updateForm.get('nazivBolesti')!.value);
      formData.append('opis', this.updateForm.get('opis')!.value);
      formData.append('datumDijagnoze', this.updateForm.get('datumDijagnoze')!.value.toString());
      formData.append('zaposlenikId', this.odabranaDijagnoza.zaposlenikId.toString());
      formData.append('korisnikDomaID', this.odabranaDijagnoza.korisnikDomaID.toString());

      if (this.dijagnozaRequest.nalazFile) {
        formData.append('file', this.dijagnozaRequest.nalazFile);
      }

      this.dijagnozaService.UpdateDijagnozu(formData).subscribe(
        response => {
          this.myAlert.showSuccess("Uspješno ažurirana dijagnoza");
          this.odabranaDijagnoza=null;
        },
        error => {
          this.myAlert.showError("Greška prilikom ažuriranja dijagnoze"); //umjesto console.error
        }
      );
    }
    this.odabranaDijagnoza=null;
    setTimeout(() => {
      this.GetAllDijagnoze();
      this.getFiltriraneDijagnoze();
    }, 3000);
  }

  onFileSelected($event: Event) {
    if (event && event.target) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.dijagnozaRequest.nalazFile = inputElement.files[0];
        this.fileSelected = true;
      }
    }
  }

  downloadFile(dijagnozaId: number) {
    const url = `${MyConfig.adresa_servera}/dijagnoza/downloadFile/${dijagnozaId}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = `Dijagnoza_${dijagnozaId}.dat`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }


  deleteFile(dijagnozaId: number) {
    const url = `${MyConfig.adresa_servera}/dijagnoza/deleteFile/${dijagnozaId}`;
    this.httpClient.delete(url, { responseType: 'text' }).subscribe(
      () => {
        this.myAlert.showSuccess('Fajl uspješno obrisan.');

      },
      (error) => {
        this.myAlert.showError('Greška prilikom brisanja fajla:');
      }
    );
  }
}




