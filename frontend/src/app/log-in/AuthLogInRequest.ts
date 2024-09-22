export interface AuthLogInRequest {
    korisnickoIme: string;
    lozinka: string;
    jeAdmin: boolean;
    jeNjegovatelj: boolean;
    jeFizioterapeut: boolean;
    jeNutricionista: boolean;
    jeDoktor: boolean;
    SignalRConnectionID:string | null;
}

