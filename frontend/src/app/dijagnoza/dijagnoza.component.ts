import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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

@Component({
  selector: 'app-dijagnoza',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
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


  constructor(public httpClient: HttpClient, private dialog: MatDialog, private korisnikDomaService:KorisnikDomaService, private doktorService: DoktorService, private dijagnozaService: DijagnozaService) {
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

  GetAllKorisnike()
  {
    this.korisnikDomaService.GetAllKorisnici().subscribe((data)=>{
      console.log(data);
      this.korisniciDoma=data.korisnici;
    });
  }

  GetAllDoktore()
  {
    this.doktorService.GetAllDoktori().subscribe((data)=>{
      console.log(data);
      this.doktori=data.doktori;
    });
  }

  Dodaj() {

    console.log(this.dijagnozaRequest);
    const formData: FormData = new FormData();
    formData.append('nazivBolesti', this.dijagnozaRequest.nazivBolesti);
    formData.append('opis', this.dijagnozaRequest.opis);
    formData.append('datumDijagnoze', this.dijagnozaRequest.datumDijagnoze.toString());
    formData.append('zaposlenikId', this.dijagnozaRequest.zaposlenikId.toString());
    formData.append('korisnikDomaID', this.dijagnozaRequest.korisnikDomaID.toString());

    if (this.dijagnozaRequest.nalazFile) {
      formData.append('file', this.dijagnozaRequest.nalazFile);
    }
    this.dijagnozaService.DodajDijagozu(formData).subscribe(x=>{
      console.log("Dijagnoza dodana za korisnikId= "+ this.dijagnozaRequest.korisnikDomaID)
    });
    this.showConfirmationDialog=true;
    this.setAutoHide();

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
            console.log("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati ovu dijagnozu');
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


  Odaberi(item: DijagnozaGetAllResponseDijagnoza) {
    this.odabranaDijagnoza = {
      dijagnozaId:item.dijagnozaId,
      nazivBolesti:item.nazivBolesti,
      opis:item.opis,
      datumDijagnoze:item.datumDijagnoze,
      korisnikDomaID:item.korisnikDomaID,
      zaposlenikId:item.zaposlenikId

    } ;
  }

  Update() {
    //let url: string = MyConfig.adresa_servera + `/dijagnoza/update`;
    console.log(this.odabranaDijagnoza)
    //this.httpClient.post(url, this.odabranaDijagnoza).subscribe(request => {
      //console.log("Dijagnoza updateovana ", request)
    //})

    this.dijagnozaService.UpdateDijagnozu(this.odabranaDijagnoza).subscribe(x=>{
      console.log("Dijagnoza updateovana ")
    });
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

  //dugme uklonjeno za potrebe hci-a postaviti opet gdje bude potrebno
  deleteFile(dijagnozaId: number) {
    const url = `${MyConfig.adresa_servera}/dijagnoza/deleteFile/${dijagnozaId}`;
    this.httpClient.delete(url, { responseType: 'text' }).subscribe(
      () => {
        console.log('Fajl uspešno obrisan.');

      },
      (error) => {
        console.error('Greška prilikom brisanja fajla:', error);
      }
    );
  }
}




