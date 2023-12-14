export interface GetAllPoslovnaPozicijaResponse {
    poslovnePozicije: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[];
}

export interface GetAllPoslovnaPozicijaResponsePoslovnaPozicija {
    poslovnaPozicijaId: number;
    opisPosla: string;
    brojSati: number;
    nazivPozicije: string;
}
