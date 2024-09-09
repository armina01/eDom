namespace DomZaStaraLicaApi.Endpoints.ProvjeriTrajanjeTokena
{
    public class ProvjeriTrajanjeTokenaResponse
    {
        public bool Istekao { get; set; }
        public string NoviToken { get; set; }
        public string? Poruka { get; set; }
        public Data.Models.AuthToken autentifikacijaToken { get; set; }

    }
}
