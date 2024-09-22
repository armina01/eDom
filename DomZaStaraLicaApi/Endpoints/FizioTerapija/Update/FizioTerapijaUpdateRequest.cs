namespace DomZaStaraLicaApi.Endpoints.FizioTerapija.Update
{
    public class FizioTerapijaUpdateRequest
    {
        public int FizioTerapijaId { get; set; }
        public string Opis { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
    }
}
