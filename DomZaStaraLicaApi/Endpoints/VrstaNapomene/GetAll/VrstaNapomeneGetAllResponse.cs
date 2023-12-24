namespace DomZaStaraLicaApi.Endpoints.VrstaNapomene.GetAll
{
    public class VrstaNapomeneGetAllResponse
    {
        public List<VrstaNapomeneGetAllResponseVrstaNapomene> VrsteNapomena { get; set; }
    }

    public class VrstaNapomeneGetAllResponseVrstaNapomene
    {
        public int VrstaNapomeneId { get; set; }
        public string Opis { get; set; }
    }
}
