export interface NotifikacijaRequest{
  poruka:string
}
export interface NotifikacijaResponse{
  notifikacije: NotifikacijaResponseNotifikacija[]
}
export interface NotifikacijaResponseNotifikacija{
  notifikacijaId:number
  poruka:string
}
