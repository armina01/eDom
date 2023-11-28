using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Doktor.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Fizioterapeut.Dodaj
{
    [Route("Fizioterapeut-dodaj")]
    public class FizioterapeutDodajEndpoint:MyBaseEndpoint<FizioterapeutDodajRequest, FizioterapeutDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FizioterapeutDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<FizioterapeutDodajResponse> Obradi([FromBody] FizioterapeutDodajRequest request)
        {
            var newObj = new Data.Models.Fizioterapeut
            {
                ImePrezime = request.ImePrezime,
                JMBG = request.JMBG,
                DatumRodjenja = request.DatumRodjenja,
                DatumZaposlenja = request.DatumZaposlenja,
                NalogId = request.NalogId,
                PoslovnaPozicijaId = request.PoslovnaPozicijaId,
                OblastFizijatrije=request.OblastFizijatrije

            };
            _applicationDbContext.Fizioterapeut.Add(newObj);

            await _applicationDbContext.SaveChangesAsync();

            return new FizioterapeutDodajResponse
            {
                ZaposlenikID = newObj.ZaposlenikId,
            };

        }
    }
}

