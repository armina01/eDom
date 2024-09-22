export interface KorisnikDomaUpdateRequest
{
  korisnikDomaID:number
  imePrezime: string
  jmbg: string
  datumRodjenja: string
  brojSobe: number
  opstinaID: number
  slika_base64_format: string | undefined
}
