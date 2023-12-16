using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.GetAll;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Opstina.GetAll
{
    [Route("opstina-getAll")]
    public class OpstinaGetAllEndpoint:MyBaseEndpoint<OpstinaGetAllRequest, OpstinaGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public OpstinaGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<OpstinaGetAllResponse> Obradi([FromQuery] OpstinaGetAllRequest request)
        {
            var opstina = await _applicationDbContext.Opstina
                .OrderByDescending(x => x.OpstinaID)
                .Select(x => new OpstinaGetAllResponseOpstina()
                {
                    OpstinaID = x.OpstinaID,
                    NazivOpstine=x.NazivOpstine,
                    PostanskiBroj=x.PostanskiBroj
                })
                .ToListAsync();

            return new OpstinaGetAllResponse
            {
                Opstine = opstina
            };
        }
    }




}

