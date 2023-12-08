import {GetAllKorisnickiNalogResponseKorisnickiNalog} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";

export interface GetAllNutricionisteResponse {
    nutricionisti: GetAllNutricionistaResponseNutricionista[];
}
export interface GetAllNutricionistaResponseNutricionista {
    zaposlenikId:number
    imePrezime: string;
    jmbg: string;
    datumRodjenja: Date;
    datumZaposlenja: Date;
    nalogId: number|null;
    poslovnaPozicijaId: number;
    oblastNutricionizma:string;
    nutricionistickiCentar:string;
}
