namespace DomZaStaraLicaApi.Endpoints.Fizioterapeut.Dodaj
{
    public class FizioterapeutDodajRequest
    {
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int? NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public string OblastFizijatrije { get; set; }
    }
}
