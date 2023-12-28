using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Endpoints.PlanIshrane.DodajPlanIshrane
{
    public class DodajPlanIshraneRequest
    {
        public int FileId { get; set; }
        public int NutricionistaId { get; set; }
        public int KorisnikDomaId { get; set; }
    }
}
