import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {PlanIshraneRequest} from "./PlanIshraneRequest";
import {ActivatedRoute} from "@angular/router";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";
import {GetFileResponse, GetFileResponseFile} from "./getFileResponse";
import {Observable} from "rxjs";
import FileSaver from "file-saver";
import {GetAllPlanIshraneResponse, GetAllPlanIshraneResponsePlan} from "./getPlanIshraneResponse";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {PlanIshraneService} from "../Services/PlanIshraneService";
import {FileService} from "../Services/FileService";
import {NutricionistaService} from "../Services/NutricionistaService";
import {DodajVisePlanovaComponent} from "../dodaj-vise-planova/dodaj-vise-planova.component";
import {NavBarNutricionistaComponent} from "../nav-bar-nutricionista/nav-bar-nutricionista.component";
@Component({
  selector: 'app-dodaj-plan-ishrane',
  standalone: true,
  imports: [CommonModule,HttpClientModule,NavBarNutricionistaComponent],
  providers: [FileService,PlanIshraneService,FileService,NutricionistaService],
  templateUrl: './dodaj-plan-ishrane.component.html',
  styleUrl: './dodaj-plan-ishrane.component.css'
})
export class DodajPlanIshraneComponent {

    selectedFile: File | null = null;
    private _korisnikDomaId: number=0;
    public fajl:GetFileResponseFile|undefined=undefined;
    public fajlIme:string="";
    constructor(private http: HttpClient,private dialog: MatDialog,private route: ActivatedRoute,
                private planIshraneService:PlanIshraneService, private fileService:FileService,
                private nutricionistaService:NutricionistaService) {}
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
        this.route.params.subscribe(params => {
            this._korisnikDomaId = +params['id'] || 0;
        });
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
                this.planIshraneResponse = response.planoviIshrane.filter(x=>
                    x.korisnikDomaId===this._korisnikDomaId);
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

        this.PlanIshraneRequest.nutricionistaId=this.getZaposlenik()?.zaposlenikId || 0;
        this.PlanIshraneRequest.korisnikDomaId=this._korisnikDomaId;
        this.PlanIshraneRequest.datumPostavke=new Date();
        this.dodajPlanIshraneFetch(this.PlanIshraneRequest).subscribe(
            x=> {
                this.ngOnInit()
            }
        );
    }

    GetAllFiles():Observable<GetFileResponse>{
        return this.fileService.GetAllFile();}



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
    nutricionistaIme="";
  PrikaziImeDodavaca(nutricionistaId: number):string {
    console.log(this.nutricionisti);
      return this.nutricionisti.find((nut:any)=>nut.zaposlenikId===nutricionistaId)?.imePrezime??"";

  }
}
