namespace DomZaStaraLicaApi.Endpoints.Njegovatelj.DodajNjegovatelja
{
    public class DodajNjegovateljaRequest
    {
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public int NjegovateljID { get; set; }
        public int brojPacijenata { get; set; }
    }
}
