namespace DomZaStaraLicaApi.Endpoints.Zadatak.GetAllVrsteZadatka
{
    public class GetVrsteZadatkaResponse
    {
        public List<GetVrsteZadatkaResponseVrsteZadatka> VrsteZadatka { get; set; }
    }
    public class GetVrsteZadatkaResponseVrsteZadatka
    {
        public int VrstaZadatkaId { get; set; }
        public string Naziv { get; set; }
    }
}
