import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileService} from "../Services/FileService";
import {HttpClient} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {PlanIshraneRequest} from "../pregled-podataka-nutricionista/PlanIshraneRequest";
import {ActivatedRoute} from "@angular/router";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";

@Component({
  selector: 'app-dodaj-plan-ishrane',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dodaj-plan-ishrane.component.html',
  styleUrl: './dodaj-plan-ishrane.component.css'
})
export class DodajPlanIshraneComponent {

    selectedFile: File | null = null;
    private _korisnikDomaId: number=0;
    constructor(private http: HttpClient,private route: ActivatedRoute) {}
    onFileSelected($event: Event) {
        const inputElement = event?.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            this.selectedFile = inputElement.files[0];
        }
    }

    ngOnInit(){
        this.route.params.subscribe(params => {
            this._korisnikDomaId = +params['id'] || 0;
        });
    }
    public fileId:number=0;

    public PlanIshraneRequest:PlanIshraneRequest={
        fileId:0,
        korisnikDomaId:0,
        nutricionistaId:0
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
                    console.log(this.fileId);
                    this.PlanIshraneRequest.fileId=this.fileId;
                    console.log('File uploaded successfully', response);
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
        let url: string = MyConfig.adresa_servera + `/dodajPlanIshrane`;

        return this.http.post(`${url}`,data);
    }
    DodajPlanIshrane(){

        this.PlanIshraneRequest.nutricionistaId=this.getZaposlenik()?.zaposlenikId || 0;
        this.PlanIshraneRequest.korisnikDomaId=this._korisnikDomaId;
        console.log(this.PlanIshraneRequest);
        this.dodajPlanIshraneFetch(this.PlanIshraneRequest).subscribe(
            x=> console.log("Uspjesno dodan plan ishrane")
        );
    }
}
