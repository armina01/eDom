export interface DodajZadatakRequest {
  opis: string;
  status: boolean;
  datumPostavke: Date;
  zaposlenikPostavioId: number|null;
  zaposlenikEditovaoId: number|null;
  intervalZadatkaId: number;
  vrstaZadatkaId: number;
}
