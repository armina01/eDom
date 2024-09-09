import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyConfig} from "../my-config";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {OpstinaGetAllResponse, OpsinaGetAllResponseOpstina} from "./opstina-getAll";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {OpstinaServiceService} from "../Services/OpstinaService";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertService} from "../Services/AlertService";




@Component({
  selector: 'app-opstina',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [OpstinaServiceService],
  templateUrl: './opstina.component.html',
  styleUrl: './opstina.component.css'
})
export class OpstinaComponent implements OnInit{
  opstine: OpsinaGetAllResponseOpstina[]=[];
  public prikaziOpstine:boolean=false;
  public odabranaOpstina: OpsinaGetAllResponseOpstina | null=null;
  opstinaForm: FormGroup;

  constructor(public httpClient:HttpClient, private dialog: MatDialog, private opstinaService: OpstinaServiceService, private fb: FormBuilder, private myAlert:AlertService) {

    this.opstinaForm = this.fb.group({
      nazivOpstine: ['', Validators.required],
      postanskiBroj: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],

    });

  }

  ngOnInit(): void {
    this.opstinaForm = this.fb.group({
      nazivOpstine: ['', Validators.required],
      postanskiBroj: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
    }



  Dodaj(): void {
    if (this.opstinaForm.valid) {
      const formValue = this.opstinaForm.value;
      this.opstinaService.DodajOpstinu(formValue).subscribe((res)=>
        this.myAlert.showSuccess("Opština ušpjesno dodana"));
    } else {
      this.opstinaForm.markAllAsTouched();
      this.myAlert.showError("Forma nije validna");
    }
  }

  GetAllOpstine() {
    this.prikaziOpstine=true;
    this.opstinaService.GetAllOpstine().subscribe((x:OpstinaGetAllResponse)=> {
      this.opstine = x.opstine;
    })
  }
  getAllOpstine() {
    return this.opstine;
  }

  ObrisiOpstinu(data: OpsinaGetAllResponseOpstina) {

    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati opštinu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.opstinaService.IzbrisiOpstinu(data).subscribe(
          response => () => {
            this.myAlert.showSuccess("Opština uspješno obrisana")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              this.myAlert.showError('Nije moguće izbrisati opštinu');
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

  Odaberi(item: OpsinaGetAllResponseOpstina) {
   this.odabranaOpstina={
     nazivOpstine:item.nazivOpstine,
     opstinaID:item.opstinaID,
     postanskiBroj:item.postanskiBroj
   };
  }

  Update() {
    this.opstinaService.UpdateOpstinu(this.odabranaOpstina).subscribe(x=>{
      this.myAlert.showSuccess("Opština uspješno ažurirana")
      this.odabranaOpstina=null;
    });

  }
}


