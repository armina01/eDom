using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Doktor.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Napomena.Dodaj
{
    [Route("napomena/dodaj")]
    public class NapomenaDodajEndpoint:MyBaseEndpoint<NapomenaDodajRequest, NapomenaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public NapomenaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<NapomenaDodajResponse> Obradi([FromBody] NapomenaDodajRequest request)
        {
            var newObj = new Data.Models.Napomena
            {
                Opis = request.Opis,
                Prioritet = request.Prioritet,
                DatumPostavke = request.DatumPostavke,
                ZaposlenikId = request.ZaposlenikId,
                KorisnikDomaID=request.KorisnikDomaID,
                VrstaNapomeneId=request.VrstaNapomeneId
                
            };
            _applicationDbContext.Napomena.Add(newObj);

            await _applicationDbContext.SaveChangesAsync();

            return new NapomenaDodajResponse
            {
                NapomenaId= newObj.NapomenaId
            };

        }
    }

}

