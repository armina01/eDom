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
}
