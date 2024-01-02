import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {MY_AUTH_SERVICE_TOKEN, MyAuthService} from "../Services/MyAuthService";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {
    KorisnikDomaGetAllResponse,
    KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {MyConfig} from "../my-config";
import {GetAllZadatakResponse, GetAllZadatakResponseZadatak} from "../get-zadaci/getAllZadaciResponse";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-pregled-arhive-zadataka',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pregled-arhive-zadataka.component.html',
  styleUrl: './pregled-arhive-zadataka.component.css'
})
export class PregledArhiveZadatakaComponent {

   constructor(public httpClient: HttpClient,@Inject(MY_AUTH_SERVICE_TOKEN) private _myAuthService: MyAuthService
                ,private dialog: MatDialog,public route: ActivatedRoute) { }
    public korisnikId=0;
    korisnici:KorisnikDomaGetAllResponseKorisnik[]=[];
    korisnik:KorisnikDomaGetAllResponseKorisnik|undefined=undefined;
    public sedmicniZadaci:GetAllZadatakResponseZadatak[]=[];
    public dnevniZadaci:GetAllZadatakResponseZadatak[]=[];
    public showSedmicni:boolean=false;
    public showDnevni:boolean=false;
   ngOnInit(){

       this.route.params.subscribe(params => {
           this.korisnikId = +params['id'] || 0;
       });
       this.PronadjiKorisnika();
   }
   PronadjiKorisnika(){
       let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
       this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x:KorisnikDomaGetAllResponse)=>{
           this.korisnici = x.korisnici;
           this.korisnik=this.korisnici.find(x=>x.korisnikDomaID===this.korisnikId) ;
       })

   }
    PregledajArhivuSedmicnihZadataka() {
        let url: string = MyConfig.adresa_servera + `/getAllZadatak`;
        this.showSedmicni=true;
        this.showDnevni=false;
        this.httpClient.get<GetAllZadatakResponse>(url).subscribe(x => {
            const todayDate = new Date();

            this.sedmicniZadaci = x.zadaci.filter(zadatak => {
                const datumPostavke = new Date(zadatak.datumPostavke);

                // Check if datumPostavke is a valid Date object
                if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {
                    // Adjust the startOfWeek for Monday to Sunday week
                    const startOfWeek = new Date(todayDate);
                    startOfWeek.setDate(todayDate.getDate() - todayDate.getDay() + 1); // Set to the first day of the week (Monday)

                    return (
                        zadatak.intervalZadatkaId === 2 &&
                        datumPostavke < startOfWeek
                    );
                } else {
                    // Handle the case where datumPostavke is not a valid Date object
                    console.error("Invalid datumPostavke:", zadatak.datumPostavke);
                    return false;
                }
            });
        });

    }

    PregledajArhivuDnevnihZadataka() {
        let todayDate = new Date();
        this.showSedmicni=false;
        this.showDnevni=true;
        let url: string = MyConfig.adresa_servera + `/getAllZadatak`;
        this.httpClient.get<GetAllZadatakResponse>(url).subscribe(x => {
            x.zadaci.forEach(y => {
                console.log("Danasnji datum", todayDate, "Datum zadatka", y.datumPostavke);
            });

            this.dnevniZadaci = x.zadaci.filter(zadatak => {
                const datumPostavke = new Date(zadatak.datumPostavke);

                // Check if datumPostavke is a valid Date object
                if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {
                    return (
                        zadatak.intervalZadatkaId === 1 &&
                        datumPostavke < todayDate
                    );
                } else {
                    console.error("Invalid datumPostavke:", zadatak.datumPostavke);
                    return false;
                }
            });
        });

    }
    getDnevniZadaci()
    {
        return this.dnevniZadaci;
    }
    getSedmicniZadaci()
    {
        return this.sedmicniZadaci;
    }

}
