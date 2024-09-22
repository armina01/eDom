import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GetFileResponse, GetFileResponseFile} from "../dodaj-plan-ishrane/getFileResponse";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {PlanIshraneRequest} from "../dodaj-plan-ishrane/PlanIshraneRequest";
import {PlanIshraneService} from "../Services/PlanIshraneService";
import {FileService} from "../Services/FileService";
import {NutricionistaService} from "../Services/NutricionistaService";
import {GetAllPlanIshraneResponse, GetAllPlanIshraneResponsePlan} from "../dodaj-plan-ishrane/getPlanIshraneResponse";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";
import {MyConfig} from "../my-config";
import {Observable} from "rxjs";
import FileSaver from "file-saver";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {FormsModule} from "@angular/forms";
import {SelectKorisnikeDoma} from "../dodaj-zadatke/SelectKorisnikeDoma";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {NavBarNutricionistaComponent} from "../nav-bar-nutricionista/nav-bar-nutricionista.component";

@Component({
  selector: 'app-dodaj-vise-planova',
  standalone: true,
  imports: [CommonModule, FormsModule,NavBarNutricionistaComponent],
  providers:  [FileService,PlanIshraneService,FileService,NutricionistaService],
  templateUrl: './dodaj-vise-planova.component.html',
  styleUrl: './dodaj-vise-planova.component.css'
})
export class DodajVisePlanovaComponent {
  selectedFile: File | null = null;
  private _korisnikDomaId: number=0;
  public fajl:GetFileResponseFile|undefined=undefined;
  public fajlIme:string="";

  constructor(private http: HttpClient,private dialog: MatDialog,
              private planIshraneService:PlanIshraneService, private fileService:FileService,
              private nutricionistaService:NutricionistaService ) {}
  onFileSelected($event: Event) {
    const inputElement = event?.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      if (this.selectedFile) {
        this.uploadFileFetch(this.selectedFile)
          .subscribe(response => {
            this.fileId= response.fileId;
            this.PlanIshraneRequest.fileId=this.fileId;
          }, error => {
            console.error('Error uploading file', error);
          });

      }
    }
  }
  nutricionisti:any;
  files: GetFileResponse|null=null;
  planIshraneResponse: GetAllPlanIshraneResponsePlan [] = [];
  ngOnInit(){
    this.GetAllKorisnici();
    this.GetAllFiles().subscribe(
      (files) => {
        this.files = files;
      },
      (error) => {
        console.error('Error fetching files:', error);
      }
    );
    this.GetPlanIshrane().subscribe(
      (response) => {
        // Handle the response here
        this.planIshraneResponse = response.planoviIshrane;
        console.log(response);
      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
    this.nutricionistaService.GetAllNutricionisti().subscribe(x=>{
      this.nutricionisti=x.nutricionisti;
    })
  }
  public fileId:number=0;

  public PlanIshraneRequest:PlanIshraneRequest={
    fileId:0,
    korisnikDomaId:0,
    nutricionistaId:0,
    datumPostavke: new Date()
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
  uploadFile() {
    if (this.selectedFile) {
      this.uploadFileFetch(this.selectedFile)
        .subscribe(response => {
          this.fileId= response.fileId;
          this.PlanIshraneRequest.fileId=this.fileId;
        }, error => {
          console.error('Error uploading file', error);
        });

    }
  }
  uploadFileFetch(file: File) {
    let url: string = MyConfig.adresa_servera + `/uploadfile`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ fileId: number }>(`${url}/upload`, formData);
  }
  dodajPlanIshraneFetch(data: PlanIshraneRequest) {
    return this.planIshraneService.DodajPlanIshrane(data);
  }
  DodajPlanIshrane(){
    let selectedKorisnici=this._showKorisnici.filter(x=>x.selected===true)
    if (selectedKorisnici.length===0)
    {
      this.showErrorNemaKorisnika=true;
    }
    this.PlanIshraneRequest.nutricionistaId=this.getZaposlenik()?.zaposlenikId || 0;
    this.PlanIshraneRequest.datumPostavke=new Date();
    selectedKorisnici.forEach(korisnik=> {
      this.PlanIshraneRequest.korisnikDomaId=korisnik.korisnikDomaID;
      this.dodajPlanIshraneFetch(this.PlanIshraneRequest).subscribe(
        x=> {
          this.ngOnInit()
        }
      );}
    );
  }

  GetAllFiles():Observable<GetFileResponse>{
    return this.fileService.GetAllFile();}
  public _showKorisnici:SelectKorisnikeDoma[]=[];
  korisnici:KorisnikDomaGetAllResponseKorisnik[]=[];
  ShowAllKorisnici(){
    console.log(this.korisnici)
    this.korisnici.forEach(x => {
      let _selectedKorisnikDoma: SelectKorisnikeDoma = {
        selected: false,
        korisnikDomaID: x.korisnikDomaID,
        imePrezime: x.imePrezime,
        jmbg: x.jmbg,
        datumRodjenja: x.datumRodjenja,
        brojSobe: x.brojSobe,
      };
      this._showKorisnici.push(_selectedKorisnikDoma);
    });
  }
  pretragaNaziv="";
  getKorisnici() {
    if(this.pretragaNaziv!=="") {
      return this._showKorisnici.filter(x => (x.imePrezime.toLowerCase()).startsWith(this.pretragaNaziv.toLowerCase()))
    } else {
      return this._showKorisnici;
    }
  }
  SelectAll() {
    this._showKorisnici.forEach(x=>x.selected=this.isSelected)
    this.isSelected = !this.isSelected;
  }
  public isSelected:boolean=true;
  downloadFile(file:number) {
    this.fileService.DownloadFile(file)
      .subscribe((data: ArrayBuffer) => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          FileSaver.saveAs(blob, 'downloaded_file.pdf');
        },
        error => {
          console.error('Error downloading file:', error);
        });
  }
  GetPlanIshrane():Observable<GetAllPlanIshraneResponse>{
    return this.planIshraneService.GetAllPlanIshrane();
  }

  PrikaziImeFajla(fileId: number) {
    this.fajl=this.files?.files.find(x=>x.fileId===fileId)
    return this.fajlIme=this.fajl?.imeFile??"";
  }

  deletePlanIshrane(planIshrane: GetAllPlanIshraneResponsePlan) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nutricionistu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.planIshraneService.IzbrisiPlanIshrane(planIshrane).subscribe(
          () => {
            this.DeleteFile(planIshrane.fileId);
            this.ngOnInit();
          });
      }
    });
  }
  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };
  DeleteFile(fileId:number){

    this.fileService.IzbrisiFile(fileId).subscribe(x=>{})
  }
  GetAllKorisnici(){
    let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
    this.http.get<KorisnikDomaGetAllResponse>(url).subscribe((x:KorisnikDomaGetAllResponse)=>{
      this.korisnici = x.korisnici;
      this.ShowAllKorisnici();
    })

  }
  nutricionistaIme="";
  showErrorNemaKorisnika =false;
  PrikaziImeDodavaca(nutricionistaId: number):string {
    console.log(this.nutricionisti);
    return this.nutricionisti.find((nut:any)=>nut.zaposlenikId===nutricionistaId)?.imePrezime??"";

  }
}
