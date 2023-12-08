using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.PoslovnaPozicija.DodajPoslovnaPozicija
{
    public class DodajPoslovnaPozicijaEndpoint:MyBaseEndpoint<DodajPoslovnaPozicijaRequest,
        DodajPoslovnaPozicijaResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DodajPoslovnaPozicijaEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("/dodajPoslovnuPoziciju")]
        public override async Task<DodajPoslovnaPozicijaResponse> Obradi([FromBody]DodajPoslovnaPozicijaRequest request)
        {
            var newObj = new Data.Models.PoslovnaPozicija
            {
                OpisPosla=request.OpisPosla,
                BrojSati=request.BrojSati,
                NazivPozicije=request.Zvanje,
            };
             _applicationDbContext.PoslovnaPozicija.AddAsync(newObj);
            await _applicationDbContext.SaveChangesAsync();
            return new DodajPoslovnaPozicijaResponse
            {
                PoslovnaPozicijaId=newObj.PoslovnaPozicijaId
            };
        }
    }
}
