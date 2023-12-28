using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.PlanIshrane.DodajPlanIshrane
{
    [Route("/dodajPlanIshrane")]
    public class DodajPlanIshraneEndpoint : MyBaseEndpoint<DodajPlanIshraneRequest,
        DodajPlanIshraneResponse>
    {
        ApplicationDbContext _applicationDbContext;
        public DodajPlanIshraneEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public override async Task<DodajPlanIshraneResponse> Obradi(DodajPlanIshraneRequest request)
        {
            var planIshrane = new Data.Models.PlanIshrane
            {
                KorisnikDomaId=request.KorisnikDomaId,
                NutricionistaId=request.NutricionistaId,
                FileId=request.FileId
            };
            _applicationDbContext.PlanIshrane.Add(planIshrane);
            await _applicationDbContext.SaveChangesAsync();
            return new DodajPlanIshraneResponse
            {
                
            };
        }
    }
}
