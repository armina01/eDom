using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Zadatak.GetAllVrsteZadatka;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.GetIntervalZadatka
{
    [Route("/getIntervalZadatka")]
    public class GetIntervalZadatkaEndpoint:MyBaseEndpoint<NoRequest,
        GetIntervalZadatkaResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GetIntervalZadatkaEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public override async Task<GetIntervalZadatkaResponse> Obradi([FromQuery] NoRequest request)
        {
            var vrsteZadatka = await _applicationDbContext.IntervalZadatka
            .OrderByDescending(x => x.IntervalZadatkaId)
            .Select(x => new GetIntervalZadatkaResponseIntervalZadatka()
            {
                IntervalZadatkaId = x.IntervalZadatkaId,
                JeDnevni = x.JeDnevni,
                JeSedmicni= x.JeSedmicni
            })
            .ToListAsync();
            return new GetIntervalZadatkaResponse
            {
                IntervaliZadatka = vrsteZadatka
            };
        }
    }
}
