export interface DijagnozaGetAllResponse{
  dijagnoze:DijagnozaGetAllResponseDijagnoza[]
}

export interface DijagnozaGetAllResponseDijagnoza
{
  dijagnozaId: number
  nazivBolesti: string
  opis: string
  datumDijagnoze: string
  zaposlenikId: number
  korisnikDomaID: number
}
