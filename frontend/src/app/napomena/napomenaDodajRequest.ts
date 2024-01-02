export interface NapomenaDodajRequest{
  opis: string
  prioritet: boolean
  datumPostavke: Date
  isAktivna:boolean
  zaposlenikId: number
  korisnikDomaID: number
  vrstaNapomeneId: number
}
