using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Doktor.Delete
{
    [Route("doktor-obrisi")]
    public class DoktorDeleteEndpoint:MyBaseEndpoint<DoktorDeleteRequest, DoktorDeleteResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DoktorDeleteEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public override async Task<DoktorDeleteResponse> Obradi([FromQuery] DoktorDeleteRequest request)
        {

            var doktor = _applicationDbContext.Doktor.FirstOrDefault(x=>x.ZaposlenikId == request.ZaposlenikId);

            if (doktor == null)
            {
                throw new Exception("nije pronadjen doktor za id = " + request.ZaposlenikId);
            }

            _applicationDbContext.Remove(doktor);
            await _applicationDbContext.SaveChangesAsync();

            return new DoktorDeleteResponse
            {

            };
        }

    }
}
