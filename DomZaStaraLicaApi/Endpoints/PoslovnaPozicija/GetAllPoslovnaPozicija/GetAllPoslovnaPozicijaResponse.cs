namespace DomZaStaraLicaApi.Endpoints.PoslovnaPozicija.GetAllPoslovnaPozicija
{
    public class GetAllPoslovnaPozicijaResponse
    {
        public List<GetAllPoslovnaPozicijaResponsePoslovnaPozicija> PoslovnePozicije { get; set; }
    }
    public class GetAllPoslovnaPozicijaResponsePoslovnaPozicija
    {
        public int PoslovnaPozicijaId { get; set; }
        public string OpisPosla { get; set; }
        public int BrojSati { get; set; }
        public string Zvanje { get; set; }
    }
}
