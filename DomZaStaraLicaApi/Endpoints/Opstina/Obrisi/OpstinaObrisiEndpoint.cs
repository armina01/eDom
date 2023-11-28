using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Obrisi;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Opstina.Obrisi
{
    [Route("opstina-obrisi")]
    public class OpstinaObrisiEndpoint : MyBaseEndpoint<OpstinaObrisiRequest, OpstinaObrisiResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public OpstinaObrisiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public override async Task<OpstinaObrisiResponse> Obradi([FromQuery] OpstinaObrisiRequest request)
        {

            var opstina = _applicationDbContext.Opstina.FirstOrDefault(x => x.OpstinaID == request.OpstinaID);

            if (opstina == null)
            {
                throw new Exception("nije pronadjena opstina za id = " + request.OpstinaID);
            }

            _applicationDbContext.Remove(opstina);
            await _applicationDbContext.SaveChangesAsync();

            return new OpstinaObrisiResponse
            {

            };
        }
    }
}
