export interface DodajNutricionistuRequest {
    imePrezime: string;
    jmbg: string;
    datumRodjenja: Date;
    datumZaposlenja: Date;
    nalogId: number| null;
    poslovnaPozicijaId: number;
    nutricionistickiCentar: string;
    oblastNutricionizma: string;
}
