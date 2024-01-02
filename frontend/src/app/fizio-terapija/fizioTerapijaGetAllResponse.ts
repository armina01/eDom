export interface FizioTerapijaGetAllResponse{
  fizioTerapije:FizioTerapijaGetAllResponseFizioTerapija[]
}

export interface FizioTerapijaGetAllResponseFizioTerapija{
fizioTerapijaId:number,
  opis:string,
  datumPostavke:Date,
  zaposlenikId:number,
  korisnikDomaID:number
}
