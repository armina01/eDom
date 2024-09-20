using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.Update
{
    [Route("dijagnoza/update")]
    public class DijagnozaUpdateEndpoint: MyBaseEndpoint<DijagnozaUpdateRequest, DijagnozaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DijagnozaUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<DijagnozaUpdateResponse> Obradi(DijagnozaUpdateRequest request)
        {
            var dijagnoza=_applicationDbContext.Dijagnoza.FirstOrDefault(x=>x.dijagnozaId==request.dijagnozaId);
            if (dijagnoza==null)
            {
                throw new Exception("Nije pronadjena dijagnoza za id= " + request.dijagnozaId);
            }
            dijagnoza.nazivBolesti=request.nazivBolesti;
            dijagnoza.opis=request.opis;
            dijagnoza.datumDijagnoze=request.datumDijagnoze;
            dijagnoza.ZaposlenikId=request.ZaposlenikId;
            dijagnoza.KorisnikDomaID=request.KorisnikDomaID;

            await _applicationDbContext.SaveChangesAsync();

            return new DijagnozaUpdateResponse()
            {
                dijagnozaId=dijagnoza.dijagnozaId,
            };
        }

    }
}
