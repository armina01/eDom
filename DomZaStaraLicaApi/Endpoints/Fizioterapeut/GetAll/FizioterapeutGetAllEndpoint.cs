using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Doktor.GetAllDoktor;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Fizioterapeut.GetAll
{
    [Route("fizioterapeut-getAll")]
    public class FizioterapeutGetAllEndpoint:MyBaseEndpoint<FizioterapeutGetAllRequest, FizioterapeutGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FizioterapeutGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<FizioterapeutGetAllResponse> Obradi([FromQuery] FizioterapeutGetAllRequest request)
        {
            var fizioterapeut = await _applicationDbContext.Fizioterapeut
                .OrderByDescending(x => x.ZaposlenikId)
                .Select(x => new FizioterapeutGetAllResponseFizioterapeut()
                {
                    ZaposlenikId = x.ZaposlenikId,
                    ImePrezime = x.ImePrezime,
                    JMBG = x.JMBG,
                    DatumRodjenja = x.DatumRodjenja,
                    DatumZaposlenja = x.DatumZaposlenja,
                    OblastFizijatrije = x.OblastFizijatrije,
                    NalogId = x.NalogId,
                    PoslovnaPozicijaId = x.PoslovnaPozicijaId
                })
                .ToListAsync();

            return new FizioterapeutGetAllResponse
            {
                Fizioterapeuti = fizioterapeut
            };
        }
    }
}

