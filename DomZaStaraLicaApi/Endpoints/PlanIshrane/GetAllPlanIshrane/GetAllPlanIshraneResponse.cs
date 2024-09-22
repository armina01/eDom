namespace DomZaStaraLicaApi.Endpoints.PlanIshrane.GetAllPlanIshrane
{
    public class GetAllPlanIshraneResponse
    {
        public List<GetAllPlanIshraneResponsePlan> PlanoviIshrane { get; set; }
    }
    public class GetAllPlanIshraneResponsePlan
    {
        public int PlanIshraneId { get; set; }
        public int FileId { get; set; }
        public int NutricionistaId { get; set; }
        public int KorisnikDomaId { get; set; }
        public DateTime DatumPostavke { get; set; }
    }
}
