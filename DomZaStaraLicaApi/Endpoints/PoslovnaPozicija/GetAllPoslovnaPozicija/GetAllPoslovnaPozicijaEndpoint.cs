using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnickiNalog.GetAllKorisnickiNalog;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.PoslovnaPozicija.GetAllPoslovnaPozicija
{
      [Route("getAllPoslovnaPozicija")]
        public class GetAllPoslovnaPozicijaEndpoint : MyBaseEndpoint<GetAllPoslovnaPozicijaRequest,
        GetAllPoslovnaPozicijaResponse>
        {
            private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _authService;
        public GetAllPoslovnaPozicijaEndpoint(ApplicationDbContext applicationDbContext,
                   MyAuthService authService)
            {
                _applicationDbContext = applicationDbContext;
                  _authService = authService;
        }
            [HttpGet]
            public override async Task<GetAllPoslovnaPozicijaResponse> Obradi([FromQuery] GetAllPoslovnaPozicijaRequest request)
            {
               
            var poslovnaPozicija = await _applicationDbContext.PoslovnaPozicija
                .OrderByDescending(x => x.PoslovnaPozicijaId)
                .Select(x => new GetAllPoslovnaPozicijaResponsePoslovnaPozicija()
                {
                    PoslovnaPozicijaId=x.PoslovnaPozicijaId,
                    OpisPosla=x.OpisPosla,
                    NazivPozicije = x.NazivPozicije,
                    BrojSati=x.BrojSati
                })
                .ToListAsync();
                return new GetAllPoslovnaPozicijaResponse
                {
                    PoslovnePozicije = poslovnaPozicija
                };
            }
        }
    
}
