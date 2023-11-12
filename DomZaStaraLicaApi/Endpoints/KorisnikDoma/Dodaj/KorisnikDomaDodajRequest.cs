namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj
{
    public class KorisnikDomaDodajRequest
    {
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public int BrojSobe { get; set; }
        public int OpstinaID { get; set; }

    }
}
