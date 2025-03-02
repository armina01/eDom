import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OpstinaComponent} from "../opstina/opstina.component";
import {OpsinaGetAllResponseOpstina, OpstinaGetAllResponse} from "../opstina/opstina-getAll";
import {map, Observable} from "rxjs";
import {KorisnikRequest} from "./korisnikRequest";
import {MyAuthService} from "../Services/MyAuthService";
import {SignalRService} from "../Services/signalR.service";
import {KorisnikDomaService} from "../Services/KorisnikDomaService";
import {OpstinaServiceService} from "../Services/OpstinaService";
import {AlertService} from "../Services/AlertService";
import {AlertComponent} from "../alert/alert.component";
import {NavBarAdminComponent} from "../nav-bar-admin/nav-bar-admin.component";


@Component({
  selector: 'app-korisnik',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertComponent, NavBarAdminComponent],
  providers: [KorisnikDomaService, OpstinaServiceService],
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css'] // Fixed styleUrls key
})
export class KorisnikComponent implements OnInit {

    options: OpsinaGetAllResponseOpstina[] = [];
    pretragaNaziv = "";
    KorisnikDomaForma: FormGroup;

    constructor(public httpClient: HttpClient,private korisnikDomaService:KorisnikDomaService,
                private opstinaService:OpstinaServiceService, private formBuilder: FormBuilder, private myAlert:AlertService) {

      this.KorisnikDomaForma = this.formBuilder.group({
        imePrezime: ['', Validators.required],
        jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
        datumRodjenja: ['', Validators.required],
        brojSobe: ['', Validators.required],
        opstinaID: ['', Validators.required],
      });

    }

    public korisnikRequest: KorisnikRequest = {
        imePrezime: "",
        jmbg: "",
        datumRodjenja: "",
        brojSobe: 0,
        opstinaID: 0,
        slika_base64_format:""

    }

    ngOnInit(): void {
        this.opstinaService.GetAllOpstine().subscribe((data) => {
            this.options = data.opstine;
        });

    }


    Dodaj() {

      if (this.KorisnikDomaForma.valid) {
          this.korisnikRequest.imePrezime=this.KorisnikDomaForma.get('imePrezime')?.value || '';
          this.korisnikRequest.jmbg=this.KorisnikDomaForma.get('jmbg')?.value || '';
          this.korisnikRequest.datumRodjenja=this.KorisnikDomaForma.get('datumRodjenja')?.value || '';
          this.korisnikRequest.brojSobe=this.KorisnikDomaForma.get('brojSobe')?.value || '';
          this.korisnikRequest.opstinaID=this.KorisnikDomaForma.get('opstinaID')?.value || '';

        this.korisnikDomaService.DodajKorisnikaDoma(this.korisnikRequest).subscribe()
        this.myAlert.showSuccess("Korisnik uspjesno dodan")
      } else {
        this.myAlert.showError("Nije uspješno dodavanje korisnika")
      }

    }

  generisi_preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file)
    {
      var reader = new FileReader();
      reader.onload = ()=>{
        this.korisnikRequest!.slika_base64_format = reader.result?.toString();
      }
      reader.readAsDataURL(file)
    }
  }
}

