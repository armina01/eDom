namespace DomZaStaraLicaApi.Endpoints.NotifikacijaZadatak.GetNotifikacijuZadatak
{
    public class GetNotificationResponse
    {
        public List<GetNotificationResponseNotification> Notifikacije { get; set; }
    }
    public class GetNotificationResponseNotification
    {
        public int NotifikacijaId { get; set; }
        public string Poruka { get; set; }
    }
}
