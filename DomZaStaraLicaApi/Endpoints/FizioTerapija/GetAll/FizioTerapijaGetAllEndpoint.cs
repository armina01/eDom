using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.FizioTerapija.GetAll
{
    [Route("fizioTerapija/getAll")]
    public class FizioTerapijaGetAllEndpoint:MyBaseEndpoint<NoRequest, FizioTerapijaGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FizioTerapijaGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async override Task<FizioTerapijaGetAllResponse> Obradi([FromQuery] NoRequest request)
        {
            var terapija = await _applicationDbContext.FizioTerapija.OrderByDescending(x => x.FizioTerapijaId)
                .Select(x => new FizioTerapijaGetAllResponseFizioTerapija()
                {
                   FizioTerapijaId=x.FizioTerapijaId,
                   Opis=x.Opis,
                   DatumPostavke=x.DatumPostavke,
                   ZaposlenikId=x.ZaposlenikId,
                   KorisnikDomaID=x.KorisnikDomaID

                })
                .ToListAsync();

            return new FizioTerapijaGetAllResponse()
            {
                FizioTerapije=terapija
            };

        }
    }
}
