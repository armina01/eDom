export interface KorisnikDomaGetAllResponse{
 korisnici:KorisnikDomaGetAllResponseKorisnik[]
}

export interface KorisnikDomaGetAllResponseKorisnik{
  random: any;
  korisnikDomaID: number
  imePrezime: string
  jmbg: string
  datumRodjenja: string
  brojSobe: number
  opstinaID:number
  opstinaNaziv: string
  opstinaBroj: number
  slikaKorisnika:string
}
