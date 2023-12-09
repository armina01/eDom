using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.GetAll;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Doktor.GetAllDoktor
{
    [Route("doktor-getAll")]
    public class DoktorGetAllEndpoint:MyBaseEndpoint<DoktorGetAllRequest, DoktorGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DoktorGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<DoktorGetAllResponse> Obradi([FromQuery] DoktorGetAllRequest request)
        {
            var doktor = await _applicationDbContext.Doktor
                .OrderByDescending(x => x.ZaposlenikId)
                .Select(x => new DoktorGetAllResponseDoktor()
                {
                   ZaposlenikId= x.ZaposlenikId,
                   ImePrezime=x.ImePrezime,
                   JMBG=x.JMBG,
                   DatumRodjenja=x.DatumRodjenja,
                   DatumZaposlenja=x.DatumZaposlenja,
                   Specijalizacija=x.Specijalizacija,
                   OblastMedicine=x.OblastMedicine,
                   NazivKlinike=x.NazivKlinike,
                   NalogId=x.NalogId,
                   PoslovnaPozicijaId=x.PoslovnaPozicijaId
                })
                .ToListAsync();

            return new DoktorGetAllResponse
            {
                Doktori= doktor
            };
        }
    }
}

