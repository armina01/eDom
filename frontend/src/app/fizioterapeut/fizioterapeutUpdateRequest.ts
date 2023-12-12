export interface FizioterapeutUpdateRequest {
    zaposlenikId: number
    imePrezime: string
    jmbg: string
    datumRodjenja: string
    datumZaposlenja: string
    nalogId: number | null
    poslovnaPozicijaId: number
    oblastFizijatrije: string
}
