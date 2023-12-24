export interface TerapijaGetAllResponse
{
 terapije:TerapijaGetAllResponseTerapija[]
}

export interface TerapijaGetAllResponseTerapija
{
    terapijaId: number;
    opis: string;
    doktorId: number;
    lijekId: number | null;
    korisnikDomaID:number;
    nacinPrimjene: string;
    vremenskiInterval: string;
}
