namespace DomZaStaraLicaApi.Endpoints.FizioTerapija.GetAll
{
    public class FizioTerapijaGetAllResponse
    {
        public List<FizioTerapijaGetAllResponseFizioTerapija> FizioTerapije { get; set;}
    }

    public class FizioTerapijaGetAllResponseFizioTerapija
    {
        public int FizioTerapijaId { get; set; }
        public string Opis { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
    }
}
