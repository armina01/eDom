export interface DoktorGetAllResponse{
    doktori:DoktorGetAllResponseDoktor[]
}
export interface DoktorGetAllResponseDoktor {
    zaposlenikId: number
    imePrezime: string
    jmbg: string
    datumRodjenja: string
    datumZaposlenja: string
    nalogId: any
    poslovnaPozicijaId: number
    nazivKlinike: string
    oblastMedicine: string
    specijalizacija: string
}
