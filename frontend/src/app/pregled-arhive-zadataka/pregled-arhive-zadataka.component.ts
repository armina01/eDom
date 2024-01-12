import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import { MyAuthService} from "../Services/MyAuthService";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {
    KorisnikDomaGetAllResponse,
    KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {MyConfig} from "../my-config";
import {GetAllZadatakResponse, GetAllZadatakResponseZadatak} from "../get-zadaci/getAllZadaciResponse";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ZadaciService} from "../Services/ZadaciService";

@Component({
  selector: 'app-pregled-arhive-zadataka',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    providers: [ZadaciService],
  templateUrl: './pregled-arhive-zadataka.component.html',
  styleUrl: './pregled-arhive-zadataka.component.css'
})
export class PregledArhiveZadatakaComponent {
    private DnevniZadatakId: number=0;
    private SedmicniZadatakId=0;
   constructor(public httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
               private _myAuthService: MyAuthService
                ,private dialog: MatDialog,public route: ActivatedRoute,
               private zadaciService:ZadaciService) { }
    public korisnikId=0;
    korisnici:KorisnikDomaGetAllResponseKorisnik[]=[];
    korisnik:KorisnikDomaGetAllResponseKorisnik|undefined=undefined;
    public sedmicniZadaci:GetAllZadatakResponseZadatak[]=[];
    public dnevniZadaci:GetAllZadatakResponseZadatak[]=[];
    public showSedmicni:boolean=false;
    public showDnevni:boolean=false;
   ngOnInit(){
       this.zadaciService.GetIntervalZadataka().subscribe(response=>{
           this.DnevniZadatakId=response.intervaliZadatka.find(x=>x.jeDnevni===true)?.intervalZadatkaId??0;
            this.SedmicniZadatakId=response.intervaliZadatka.find(x=>x.jeSedmicni===true)?.intervalZadatkaId??0;
           console.log(this.DnevniZadatakId);
       })
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

        this.showSedmicni=true;
        this.showDnevni=false;
        this.zadaciService.GetAllZadaci().subscribe(x => {
            const todayDate = new Date();

            this.sedmicniZadaci = x.zadaci.filter(zadatak => {
                const datumPostavke = new Date(zadatak.datumPostavke);

                // Check if datumPostavke is a valid Date object
                if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {
                    // Adjust the startOfWeek for Monday to Sunday week
                    const startOfWeek = new Date(todayDate);
                    startOfWeek.setDate(todayDate.getDate() - todayDate.getDay() + 1); // Set to the first day of the week (Monday)

                    return (
                        zadatak.intervalZadatkaId === this.SedmicniZadatakId &&
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
        this.zadaciService.GetAllZadaci().subscribe(x => {
            x.zadaci.forEach(y => {
                console.log(y);
            });

            this.dnevniZadaci = x.zadaci.filter(zadatak => {
                const datumPostavke = new Date(zadatak.datumPostavke);

                // Check if datumPostavke is a valid Date object
                if (Object.prototype.toString.call(datumPostavke) === "[object Date]" && !isNaN(datumPostavke.getTime())) {
                    return (
                        zadatak.intervalZadatkaId === this.DnevniZadatakId &&
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
        return this.dnevniZadaci.filter(x=>x.korisnikDomaId===this.korisnikId);
    }
    getSedmicniZadaci()
    {
        return this.sedmicniZadaci.filter(x=>x.korisnikDomaId===this.korisnikId);
    }

}
