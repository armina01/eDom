using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Update;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Opstina.Update
{
    [Route("opstina-update")]
    public class OpstinaUpdateEndpoint:MyBaseEndpoint<OpstinaUpdateRequest, OpstinaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public OpstinaUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }


        [HttpPost]
        public override async Task<OpstinaUpdateResponse> Obradi([FromBody] OpstinaUpdateRequest request)
        {
            var opstina = _applicationDbContext.Opstina.FirstOrDefault(x=>x.OpstinaID== request.OpstinaID);

            if (opstina == null)
            {
                throw new Exception("nije pronadjena opstina za id = " + request.OpstinaID);
            }

            opstina.NazivOpstine=request.NazivOpstine;
            opstina.PostanskiBroj=request.PostanskiBroj;

            await _applicationDbContext.SaveChangesAsync();

            return new OpstinaUpdateResponse
            {
                OpstinaID=request.OpstinaID
            };
        }
    }
}
