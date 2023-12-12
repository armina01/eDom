export interface DodajNjegovateljaRequest {
    imePrezime: string;
    jmbg: string;
    datumRodjenja: Date;
    datumZaposlenja: Date;
    nalogId: number| null;
    poslovnaPozicijaId: number;
    brojPacijenata: number;
    isMedicinskiTehnicar: boolean;
    isNjegovatelj: boolean;
}
