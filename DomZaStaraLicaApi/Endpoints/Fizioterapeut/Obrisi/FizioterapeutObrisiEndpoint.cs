using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Doktor.Delete;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Fizioterapeut.Obrisi
{
    [Route("Fizioterapeut-obrisi")]
    public class FizioterapeutObrisiEndpoint:MyBaseEndpoint<FizioterapeutObrisiRequest, FizioterapeutObrisiResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FizioterapeutObrisiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public override async Task<FizioterapeutObrisiResponse> Obradi([FromQuery] FizioterapeutObrisiRequest request)
        {

            var fizioterapeut = _applicationDbContext.Fizioterapeut.FirstOrDefault(x=>x.ZaposlenikId==request.ZaposlenikId);
            if (fizioterapeut == null)
            {
                throw new Exception("nije pronadjen fizioterapeut za id = " + request.ZaposlenikId);
            }

            _applicationDbContext.Remove(fizioterapeut);
            await _applicationDbContext.SaveChangesAsync();

            return new FizioterapeutObrisiResponse
            {

            };
        }
    }
}
