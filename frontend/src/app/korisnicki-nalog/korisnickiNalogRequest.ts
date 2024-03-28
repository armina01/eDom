export interface KorisnickiNalogRequest {
    korisnickoIme: string;
    lozinka: string;
    email:string;
    jeAdmin: boolean;
    jeNjegovatelj: boolean;
    jeFizioterapeut: boolean;
    jeNutricionista: boolean;
    jeDoktor: boolean;
    je2FActive:boolean;
}
export interface UpdateKorisnickiNalogRequest {
  nalogId:number;
  korisnickoIme: string;
  lozinka: string;
  email:string;
  jeAdmin: boolean;
  jeNjegovatelj: boolean;
  jeFizioterapeut: boolean;
  jeNutricionista: boolean;
  jeDoktor: boolean;
  je2FActive:boolean;
}
