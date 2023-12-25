using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Napomena.GetAll
{
    [Route("napomena/getAll")]
    public class NapomenaGetAllEndpoint:MyBaseEndpoint<NoRequest, NapomenaGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public NapomenaGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<NapomenaGetAllResponse> Obradi([FromQuery] NoRequest request)
        {
            var napomena = await _applicationDbContext.Napomena
                .OrderByDescending(x => x.NapomenaId)
                .Select(x => new NapomenaGetAllResponseNapomena
                {
                    NapomenaId=x.NapomenaId,
                    Opis = x.Opis,
                    Prioritet = x.Prioritet,
                    DatumPostavke = x.DatumPostavke,
                    ZaposlenikId = x.ZaposlenikId,
                    KorisnikDomaID=x.KorisnikDomaID,
                    VrstaNapomeneId=x.VrstaNapomeneId,
                })
                .ToListAsync();

            return new NapomenaGetAllResponse
            {
                Napomene=napomena
            };
        }
    }
}
