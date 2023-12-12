import {GetAllKorisnickiNalogResponseKorisnickiNalog} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";

export interface GetAllNjegovateljiResponse {
    njegovatelji: GetAllNjegovateljaResponseNjegovatelj[];
}
export interface GetAllNjegovateljaResponseNjegovatelj {
    zaposlenikId:number
    imePrezime: string;
    jmbg: string;
    datumRodjenja: Date;
    datumZaposlenja: Date;
    nalogId: number|null;
    poslovnaPozicijaId: number;
    brojPacijenata: number;
    isMedicinskiTehnicar: boolean;
    isNjegovatelj: boolean;
}
