export interface ZaposlenikGetAllRsponse{
zaposlenici:ZaposlenikGetAllRsponseZaposlenik[]
}
export interface ZaposlenikGetAllRsponseZaposlenik{
  zaposlenikId: number
  imePrezime: string
  jmbg: string
  datumRodjenja: Date
  datumZaposlenja: Date
  nalogId: any|null
  poslovnaPozicijaId: number
}
