export interface FizioterapeutDodajRequest
{
  imePrezime: string
  jmbg: string
  datumRodjenja: string
  datumZaposlenja: string
  nalogId: number | null
  poslovnaPozicijaId: number
  oblastFizijatrije: string
}
