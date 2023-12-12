export interface DoktorUpdateRequest
{
  zaposlenikId: number
  imePrezime: string
  jmbg: string
  datumRodjenja: string
  datumZaposlenja: string
  nalogId: number | null
  poslovnaPozicijaId: number
  nazivKlinike: string
  oblastMedicine: string
  specijalizacija: string
}
