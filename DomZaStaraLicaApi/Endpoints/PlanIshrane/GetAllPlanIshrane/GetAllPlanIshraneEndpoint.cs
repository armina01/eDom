using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnickiNalog.GetAllKorisnickiNalog;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.PlanIshrane.GetAllPlanIshrane
{
    [Route("/getPlanIshrane")]
    public class GetAllPlanIshraneEndpoint:MyBaseEndpoint<
        GetAllPlanIshraneRequest,GetAllPlanIshraneResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GetAllPlanIshraneEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public override async Task<GetAllPlanIshraneResponse> Obradi([FromQuery] GetAllPlanIshraneRequest request)
        {
            var planIshrane = await _applicationDbContext.PlanIshrane
            .OrderByDescending(x => x.PlanIshraneId)
            .Select(x => new GetAllPlanIshraneResponsePlan()
            {
                 PlanIshraneId=x.PlanIshraneId,
                 FileId=x.FileId,
                 KorisnikDomaId=x.KorisnikDomaId,
                 NutricionistaId=x.NutricionistaId,
                 DatumPostavke=x.DatumPostavke
            })
            .ToListAsync();
            return new GetAllPlanIshraneResponse
            {
                PlanoviIshrane = planIshrane
            };
        }
    }
}
