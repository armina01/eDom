export interface AutentifikacijaToken {
  id: number
  vrijednost: string
  korisnickiNalogId: number
  korisnickiNalog: KorisnickiNalog
  vrijemeEvidentiranja: string
  ipAdresa: string

}
export interface KorisnickiNalog {
  korisnickoIme: string;
  lozinka: string;
  jeAdmin: boolean;
  jeNjegovatelj: boolean;
  jeFizioterapeut: boolean;
  jeNutricionista: boolean;
  jeDoktor: boolean;
}
