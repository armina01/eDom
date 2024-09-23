export interface DijagnozaUpdateRequest{
    nazivBolesti: string
    opis: string
    datumDijagnoze: Date
    zaposlenikId: number
    korisnikDomaID: number
    nalazFile: File | null;
}
