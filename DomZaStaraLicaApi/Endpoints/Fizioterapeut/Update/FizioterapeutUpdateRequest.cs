namespace DomZaStaraLicaApi.Endpoints.Fizioterapeut.Update
{
    public class FizioterapeutUpdateRequest
    {
        public int ZaposlenikId { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int? NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public string OblastFizijatrije { get; set; }
    }
}
