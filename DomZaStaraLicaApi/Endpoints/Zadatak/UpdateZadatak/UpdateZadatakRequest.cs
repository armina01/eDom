namespace DomZaStaraLicaApi.Endpoints.Zadatak.UpdateZaposlenik
{
    public class UpdateZadatakRequest
    {
        public int ZadatakId { get; set; }
        public string Opis { get; set; }
        public bool Status { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikPostavioId { get; set; }
        public int? ZaposlenikEditovaoId { get; set; }
        public int IntervalZadatkaId { get; set; }
        public int VrstaZadatkaId { get; set; }
        public int KorisnikDomaId { get; set; }
    }
}
