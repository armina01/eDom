export interface NapomenaGetAllResponse{
napomene:NapomenaGetAllResponseNapomena[]
}

export interface NapomenaGetAllResponseNapomena{
  napomenaId: number
  opis: string
  prioritet: boolean
  datumPostavke: Date
  isAktivna:boolean
  zaposlenikId: number
  korisnikDomaID: number
  vrstaNapomeneId: number
}

