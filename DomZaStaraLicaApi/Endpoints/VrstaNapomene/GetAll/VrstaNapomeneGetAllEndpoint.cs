using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.VrstaNapomene.GetAll
{
    [Route("vrstaNapomene/getAll")]
    public class VrstaNapomeneGetAllEndpoint:MyBaseEndpoint<NoRequest, VrstaNapomeneGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public VrstaNapomeneGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<VrstaNapomeneGetAllResponse> Obradi([FromQuery] NoRequest request)
        {
            var vrstaNapomene = await _applicationDbContext.VrstaNapomene
                .OrderByDescending(x => x.VrstaNapomeneId)
                .Select(x => new VrstaNapomeneGetAllResponseVrstaNapomene
                {
                    VrstaNapomeneId=x.VrstaNapomeneId,
                    Opis = x.Opis
                })
                .ToListAsync();

            return new VrstaNapomeneGetAllResponse
            {
                VrsteNapomena = vrstaNapomene
            };
        }
    }
}
