namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Update
{
    public class KorisnikDomaUpdateRequest
    {
        public int KorisnikDomaID { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public int BrojSobe { get; set; }
        public int OpstinaID { get; set; }


    }
}
