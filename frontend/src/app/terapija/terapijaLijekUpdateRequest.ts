export  interface TerapijaLijekUpdateRequest
{
  terapijaId: number;
  opis: string;
  doktorId: number;
  korisnikDomaID: number;
  nacinPrimjene: string;
  vremenskiInterval: string;
  lijekovi: number[];
}
