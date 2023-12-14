export interface GetAllZaposlenikResponse {
    zaposlenici: GetAllZaposlenikResponseZaposlenik[];
}

export interface GetAllZaposlenikResponseZaposlenik {
    zaposlenikId: number;
    imePrezime: string;
    jmbg: string;
    datumRodjenja: Date;
    datumZaposlenja: Date;
    nalogId: number;
    poslovnaPozicijaId: number;
}
