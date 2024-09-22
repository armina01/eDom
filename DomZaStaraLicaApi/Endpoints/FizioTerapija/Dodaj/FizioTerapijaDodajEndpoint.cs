using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.FizioTerapija.Dodaj
{
    [Route("fizioTerapija/dodaj")]
    public class FizioTerapijaDodajEndpoint:MyBaseEndpoint<FizioTerapijaDodajRequest, FizioTerapijaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FizioTerapijaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<FizioTerapijaDodajResponse> Obradi([FromBody] FizioTerapijaDodajRequest request)
        {
            var noviObj = new Data.Models.FizioTerapija
            {
                Opis= request.Opis,
                DatumPostavke= request.DatumPostavke,
                KorisnikDomaID=request.KorisnikDomaID,
                ZaposlenikId=request.ZaposlenikId
            };

            _applicationDbContext.Add(noviObj);
            await _applicationDbContext.SaveChangesAsync();

            return new FizioTerapijaDodajResponse
            {
                FizioTerapijaId=noviObj.FizioTerapijaId
            };
        }

    }
}

