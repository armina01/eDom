using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.GetAll
{
    [Route("dijagnoza/getAll")]
    public class DijagnozaGetAllEndpoint:MyBaseEndpoint<DijagnozaGetAllRequest, DijagnozaGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DijagnozaGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async override Task<DijagnozaGetAllResponse> Obradi([FromQuery] DijagnozaGetAllRequest request)
        {
            var dijagnoza = await _applicationDbContext.Dijagnoza.OrderByDescending(x => x.dijagnozaId)
                .Select(x=> new DijagnozaGetAllResponseDijagnoza()
                {
                    dijagnozaId = x.dijagnozaId,
                    nazivBolesti=x.nazivBolesti,
                    opis=x.opis,
                    datumDijagnoze=x.datumDijagnoze,
                    ZaposlenikId=x.ZaposlenikId,
                    KorisnikDomaID=x.KorisnikDomaID

                })
                .ToListAsync();

            return new DijagnozaGetAllResponse()
            {
                Dijagnoze = dijagnoza
            };

        }
    }
}
