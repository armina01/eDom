export interface DijagnozaGetAllResponse{
  dijagnoze:DijagnozaGetAllResponseDijagnoza[]
}

export interface DijagnozaGetAllResponseDijagnoza
{
  dijagnozaId: number
  nazivBolesti: string
  opis: string
  datumDijagnoze: Date
  zaposlenikId: number
  korisnikDomaID: number
}
