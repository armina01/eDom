using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.Dodaj
{
    [Route("dijagnoza/dodaj")]
    public class DijagnozaDodajEndpoint : MyBaseEndpoint<DijagnozaDodajRequest, DijagnozaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DijagnozaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<DijagnozaDodajResponse> Obradi([FromBody] DijagnozaDodajRequest request)
        {
            var noviObj = new Data.Models.Dijagnoza
            {
                nazivBolesti = request.nazivBolesti,
                opis = request.opis,
                datumDijagnoze = request.datumDijagnoze,
                ZaposlenikId = request.ZaposlenikId,
                KorisnikDomaID=request.KorisnikDomaID
            };

            _applicationDbContext.Add(noviObj);
            await _applicationDbContext.SaveChangesAsync();

            return new DijagnozaDodajResponse
            {
                dijagnozaId=noviObj.dijagnozaId
            };
        }

    }
}