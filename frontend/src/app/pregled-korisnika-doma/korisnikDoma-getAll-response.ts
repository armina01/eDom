export interface KorisnikDomaGetAllResponse{
 korisnici:KorisnikDomaGetAllResponseKorisnik[]
}

export interface KorisnikDomaGetAllResponseKorisnik{
  korisnikDomaID: number
  imePrezime: string
  jmbg: string
  datumRodjenja: string
  brojSobe: number
  opstinaID:number,
  opstinaNaziv: string
  opstinaBroj: number
}
