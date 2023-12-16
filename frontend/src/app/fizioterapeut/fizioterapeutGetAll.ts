export interface FizioterapeutGetAllResponse
{
  fizioterapeuti:FizioterapeutGetAllResponseFizioterapeut[]
}

export interface FizioterapeutGetAllResponseFizioterapeut
{
  zaposlenikId: number
  imePrezime: string
  jmbg: string
  datumRodjenja: string
  datumZaposlenja: string
  nalogId: number | null
  poslovnaPozicijaId: number
  oblastFizijatrije: string
}
