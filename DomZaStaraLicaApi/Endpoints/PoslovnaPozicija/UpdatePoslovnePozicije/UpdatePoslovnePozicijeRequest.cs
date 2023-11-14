namespace DomZaStaraLicaApi.Endpoints.PoslovnaPozicija.UpdatePoslovnePozicije
{
    public class UpdatePoslovnePozicijeRequest
    {
        public int PoslovnaPozicijaId { get; set; }
        public string OpisPosla { get; set; }
        public int BrojSati { get; set; }
        public string Zvanje { get; set; }
    }
}
