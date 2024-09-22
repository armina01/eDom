using System.Security.Principal;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.GetIntervalZadatka
{
    public class GetIntervalZadatkaResponse
    {
        public List<GetIntervalZadatkaResponseIntervalZadatka> IntervaliZadatka { get; set; }
    }
    public class GetIntervalZadatkaResponseIntervalZadatka
    {
        public int IntervalZadatkaId { get; set; }
        public bool JeDnevni { get; set; }
        public bool JeSedmicni { get; set; }
    }
}
