export interface GetAllZadatakResponse {
  zadaci: GetAllZadatakResponseZadatak[];
}

export interface GetAllZadatakResponseZadatak  {
  zadatakId: number;
  opis: string;
  status: boolean;
  datumPostavke: Date;
  zaposlenikPostavioId: number;
  zaposlenikEditovaoId: number|null;
  intervalZadatkaId: number;
  vrstaZadatkaId: number;
  korisnikDomaId:number;
}
export interface GetIntervalZadatakaResponse {
    intervaliZadatka: GetIntervalZadatakaResponseIntervalZadataka[];
}
export interface GetIntervalZadatakaResponseIntervalZadataka{
  intervalZadatkaId:number;
  jeDnevni:boolean;
  jeSedmicni:boolean;
}
export interface GetVrstaZadatakaResponse {
    vrsteZadatka: GetVrstaZadatakaResponseVrstaZadataka[];
}
export interface GetVrstaZadatakaResponseVrstaZadataka{
  vrstaZadatkaId:number;
  naziv:string;
}
