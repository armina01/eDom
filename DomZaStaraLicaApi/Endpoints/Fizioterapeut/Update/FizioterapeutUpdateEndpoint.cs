using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Doktor.Update;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Fizioterapeut.Update
{
    [Route("Fizioterapeut-update")]
    public class FizioterapeutUpdateEndpoint:MyBaseEndpoint<FizioterapeutUpdateRequest, FizioterapeutUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FizioterapeutUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public override async Task<FizioterapeutUpdateResponse> Obradi(FizioterapeutUpdateRequest request)
        {

            var fizioterapeut = _applicationDbContext.Fizioterapeut.FirstOrDefault(x => x.ZaposlenikId == request.ZaposlenikId);

            if (fizioterapeut == null)
            {
                throw new Exception("nije pronadjen fizioterapeut za id = " + request.ZaposlenikId);
            }

            fizioterapeut.ImePrezime = request.ImePrezime;
            fizioterapeut.JMBG = request.JMBG;
            fizioterapeut.DatumZaposlenja = request.DatumZaposlenja;
            fizioterapeut.DatumRodjenja = request.DatumRodjenja;
            fizioterapeut.NalogId = request.NalogId;
            fizioterapeut.PoslovnaPozicijaId = request.PoslovnaPozicijaId;
            fizioterapeut.OblastFizijatrije = request.OblastFizijatrije;
           

            await _applicationDbContext.SaveChangesAsync();

            return new FizioterapeutUpdateResponse
            {
                ZaposlenikId = fizioterapeut.ZaposlenikId
            };

        }
    }
}
