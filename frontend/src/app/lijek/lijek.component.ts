import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {LijekGetAllResponse, LijekGetAllResponseLijek} from "../terapija/lijekGetAllResponse";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LijekService} from "../Services/LijekService";

@Component({
  selector: 'app-lijek',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [LijekService],
  templateUrl: './lijek.component.html',
  styleUrl: './lijek.component.css'
})
export class LijekComponent implements OnInit{

  public lijekovi:LijekGetAllResponseLijek[]=[];
  public odabraniLijek: LijekGetAllResponseLijek | null = null;
    ngOnInit(): void {
        this.GetAllLijekovi();
    }

    constructor(public httpClient: HttpClient,private dialog: MatDialog, private lijekService:LijekService) {
    }


  GetAllLijekovi() {
    this.lijekService.GetAllLijekovi().subscribe(x => {
      this.lijekovi = x.lijekovi;
    })
  }

  Izbrisi(item: LijekGetAllResponseLijek) {
    const dialogRef: MatDialogRef<WarningDialogComponent, boolean> = this.openWarningDialog('Da li ste sigurni da želite izbrisati lijek?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.lijekService.IzbrisiLijek(item).subscribe(
          response => () => {
            console.log("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati ovaj lijek');
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
  Update() {
    this.lijekService.UpdateLijek(this.odabraniLijek).subscribe(request => {
      console.log("Lijek updateovan ", request)
    })

    this.odabraniLijek=null;
  }

  Odaberi(lijek: LijekGetAllResponseLijek) {
    this.odabraniLijek={
      lijekId:lijek.lijekId,
      naziv:lijek.naziv,
      uputstvo:lijek.uputstvo
    }
  };
}
