export interface GetAllKorisnickiNalogResponse {
    korisnickiNalozi: GetAllKorisnickiNalogResponseKorisnickiNalog[];
}

export interface GetAllKorisnickiNalogResponseKorisnickiNalog {
    nalogId: number;
    korisnickoIme: string;
    lozinka: string;
    jeAdmin: boolean;
    jeNjegovatelj: boolean;
    jeFizioterapeut: boolean;
    jeNutricionista: boolean;
    jeDoktor: boolean;
    email:string;
}
