using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnickiNalog.GetAllKorisnickiNalog;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.GetAllVrsteZadatka
{
    [Route("/getVrsteZadatka")]
    public class GetVrsteZadatkaEndpoint:MyBaseEndpoint<NoRequest,
        GetVrsteZadatkaResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GetVrsteZadatkaEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public override async Task<GetVrsteZadatkaResponse> Obradi([FromQuery] NoRequest request)
        {
            var vrsteZadatka = await _applicationDbContext.VrstaZadatka
            .OrderByDescending(x => x.VrstaZadatkaId)
            .Select(x => new GetVrsteZadatkaResponseVrsteZadatka()
            {
                VrstaZadatkaId=x.VrstaZadatkaId,
                Naziv=x.Naziv
            })
            .ToListAsync();
            return new GetVrsteZadatkaResponse
            {
                VrsteZadatka = vrsteZadatka
            };
        }
    }
}
