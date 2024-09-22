namespace DomZaStaraLicaApi.Endpoints.KorisnickiNalog.DodajKorisnickiNalog
{
    public class DodajKorisnickiNalogRequest
    {
        public string KorisnickoIme { get; set; }
        public string Lozinka { get; set; }
        public string Email { get; set; }
        public bool JeAdmin { get; set; }
        public bool JeNjegovatelj { get; set; }
        public bool JeFizioterapeut { get; set; }
        public bool JeNutricionista { get; set; }
        public bool JeDoktor { get; set; }
        public bool Je2FActive { get; set; }
    }
}
