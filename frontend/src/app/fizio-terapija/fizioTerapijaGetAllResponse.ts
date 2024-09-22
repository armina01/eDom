export interface FizioTerapijaGetAllResponse{
  fizioTerapije:FizioTerapijaGetAllResponseFizioTerapija[]
}

export interface FizioTerapijaGetAllResponseFizioTerapija{
fizioTerapijaId:number,
  opis:string,
  datumPostavke:string,
  zaposlenikId:number,
  korisnikDomaID:number
}
