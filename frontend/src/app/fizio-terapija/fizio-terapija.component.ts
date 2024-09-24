import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FizioTerapijaRequest} from "./fizioTerapijaRequest";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {MyConfig} from "../my-config";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {
  FizioterapeutGetAllResponse,
  FizioterapeutGetAllResponseFizioterapeut
} from "../fizioterapeut/fizioterapeutGetAll";
import {FizioTerapijaGetAllResponse, FizioTerapijaGetAllResponseFizioTerapija} from "./fizioTerapijaGetAllResponse";
import {FizioTerapijaService} from "../Services/FizioTerapijaService";
import {KorisnikDomaService} from "../Services/KorisnikDomaService";
import {AlertService} from "../Services/AlertService";
import {NavBarFizioterapeutComponent} from "../nav-bar-fizioterapeut/nav-bar-fizioterapeut.component";
import {AlertComponent} from "../alert/alert.component";
import {FizioterapeutService} from "../Services/FizioterapeutService";

@Component({
  selector: 'app-fizio-terapija',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule, NavBarFizioterapeutComponent, AlertComponent
    ],
    providers: [FizioTerapijaService, AlertService, KorisnikDomaService, FizioterapeutService],
  templateUrl: './fizio-terapija.component.html',
  styleUrl: './fizio-terapija.component.css'
})
export class FizioTerapijaComponent implements OnInit{

  public korisniciDoma:KorisnikDomaGetAllResponseKorisnik[]=[];
  public pretragaPoKorisniku: number = 0;
  public allFizioterapeuti: FizioterapeutGetAllResponseFizioterapeut[] = [];
  public allTerapije:FizioTerapijaGetAllResponseFizioTerapija[]=[];
  public odabranaTerapija:FizioTerapijaGetAllResponseFizioTerapija | null=null;
  fizioTerapijaForm: FormGroup;
  updateFizioTerapijaForm:FormGroup;
  zaposlenikId:number=0;

    ngOnInit(): void {
       this.GetAllKorisnike();
       this.GetAllFizioTerapije();
       this.GetAllFizioterapeuti();
    }
    constructor(public httpClient: HttpClient, private dialog: MatDialog, private fb: FormBuilder,
                private fizioTerapijaService:FizioTerapijaService, private myAlert:AlertService,
                private korisnikDomaService: KorisnikDomaService, private fizioterapeutService: FizioterapeutService) {
      this.fizioTerapijaForm = this.fb.group({
        opis: ['', Validators.required],
        datumPostavke: ['', Validators.required],
        korisnikDomaID: ['', Validators.required],
        zaposlenikId:['', Validators.required]
      });

      this.updateFizioTerapijaForm = this.fb.group({
        opis: ['', Validators.required],
        datumPostavke: ['', Validators.required],
        korisnikDomaID: ['', Validators.required],
        zaposlenikId:['', Validators.required]
      });
    }



    public terapijaRequest:FizioTerapijaRequest={
      opis:"",
      datumPostavke:new Date(),
      korisnikDomaID:0,
      zaposlenikId:this.zaposlenikId


    }
  public terapijaUpdateRequest:FizioTerapijaGetAllResponseFizioTerapija={
      fizioTerapijaId:0,
    opis:"",
    datumPostavke:"",
    korisnikDomaID:0,
    zaposlenikId:0

  }
  GetAllKorisnike() {
    this.korisnikDomaService.GetAllKorisnici().subscribe((x: KorisnikDomaGetAllResponse) => {
      this.korisniciDoma = x.korisnici;
    })
  }
  GetAllFizioterapeuti() {
    this.fizioterapeutService.GetAllFizioterapeuti().subscribe(x => {
      this.allFizioterapeuti= x.fizioterapeuti
    })
  }

  Dodaj(terapijaForm: NgForm): void {

    const korisnikString = window.localStorage.getItem('korisnik');

    let korisnikObjekat = korisnikString ? JSON.parse(korisnikString) : null;
    this.zaposlenikId = korisnikObjekat ? korisnikObjekat.zaposlenikId : this.zaposlenikId;

      if (terapijaForm.valid) {
          this.terapijaRequest.zaposlenikId=this.zaposlenikId;

          this.fizioTerapijaService.DodajTerapiju(this.terapijaRequest).subscribe(response => {
              this.myAlert.showSuccess('Terapija uspješno dodana');
          }, error => {
              this.myAlert.showError("Došlo je do greške prilikom dodavanja terapije");
          });
      } else {
          terapijaForm.control.markAllAsTouched();
      }
      setTimeout(() => {
          this.GetAllFizioTerapije();
      }, 3000);

  }
  Obrisi(item: FizioTerapijaGetAllResponseFizioTerapija) {
    const dialogRef: MatDialogRef<WarningDialogComponent, boolean> = this.openWarningDialog('Da li ste sigurni da želite izbrisati terapiju?');
    dialogRef.afterClosed().subscribe(res => {
        if (res) {
            this.fizioTerapijaService.IzbrisiTerapiju(item).subscribe(
                response => () => {
                    this.myAlert.showSuccess("Uspješno obrisana terapija")
                    setTimeout(() => {
                        this.GetAllFizioTerapije();
                        this.getFiltriraneTerapije();
                    }, 3000);
                },
                (error: any) => {
                    console.error('Error:', error);

                    if (error.status === 500) {
                        this.myAlert.showError('Nije moguće izbrisati ovu terapiju');
                    } else {
                        // Handle other errors
                        alert('An error occurred.');
                    }
                })
        }
      setTimeout(() => {
        this.GetAllFizioTerapije();
        this.getFiltriraneTerapije();
      }, 3000);
    });
  }

  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };

  GetAllFizioTerapije() {
    this.fizioTerapijaService.GetAllTerapije().subscribe(x => {
      this.allTerapije = x.fizioTerapije
    })
  }
  getFiltriraneTerapije() {
     return this.allTerapije.filter(x=>x.korisnikDomaID===this.pretragaPoKorisniku);
  }

  Odaberi(item: FizioTerapijaGetAllResponseFizioTerapija) {
    const datumTerapije = item.datumPostavke;
    const formattedDatumTerapije = this.formatDate(datumTerapije);

    this.odabranaTerapija = {
      fizioTerapijaId:item.fizioTerapijaId,
      opis:item.opis,
      datumPostavke:formattedDatumTerapije,
      zaposlenikId:item.zaposlenikId,
      korisnikDomaID:item.korisnikDomaID
    };
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' koristi format yyyy-MM-dd
  }
  Update() {
    if(this.odabranaTerapija)
    {
      this.terapijaUpdateRequest={
        fizioTerapijaId:this.odabranaTerapija.fizioTerapijaId,
        opis:this.odabranaTerapija.opis,
        datumPostavke:this.odabranaTerapija.datumPostavke,
        zaposlenikId:this.odabranaTerapija.zaposlenikId,
        korisnikDomaID:this.odabranaTerapija.korisnikDomaID
      }
    }

      this.fizioTerapijaService.UpdateTerapiju(this.terapijaUpdateRequest).subscribe(request => {
          this.myAlert.showSuccess("Terapija uspješno ažurirana ")
      })

      this.odabranaTerapija=null;

    setTimeout(() => {
      this.GetAllFizioTerapije();
    }, 3000);
  }

}

