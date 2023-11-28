namespace DomZaStaraLicaApi.Endpoints.Doktor.Update
{
    public class DoktorUpdateRequest
    {
        public int ZaposlenikId { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public string NazivKlinike { get; set; }
        public string OblastMedicine { get; set; }
        public string Specijalizacija { get; set; }
    }
}
