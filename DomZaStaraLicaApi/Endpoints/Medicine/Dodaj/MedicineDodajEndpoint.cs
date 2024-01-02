using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Medicine.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoint.Medicine.Dodaj
{
    [Route("lijek/dodaj")]
    public class MedicineDodajEndpoint : MyBaseEndpoint<MedicineDodajRequest, MedicineDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public MedicineDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<MedicineDodajResponse> Obradi([FromBody] MedicineDodajRequest request)
        {
            var newObj = new Data.Models.CLijek
            {

                Naziv=request.Naziv,
                Uputstvo=request.Uputstvo

            };
            _applicationDbContext.Lijek.Add(newObj);

            await _applicationDbContext.SaveChangesAsync();

            return new MedicineDodajResponse
            {
                LijekId=newObj.LijekId
            };

        }
    }
}

