export interface NapomenaGetAllResponse{
napomene:NapomenaGetAllResponseNapomena[]
}

export interface NapomenaGetAllResponseNapomena{
  napomenaId: number
  opis: string
  prioritet: boolean
  datumPostavke: Date
  zaposlenikId: number
  korisnikDomaID: number
  vrstaNapomeneId: number
}
