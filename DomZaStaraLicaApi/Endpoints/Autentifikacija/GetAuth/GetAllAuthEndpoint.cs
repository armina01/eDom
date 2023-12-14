using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Endpoints.Autentifikacija.LogIn;
using DomZaStaraLicaApi.Endpoints.KorisnickiNalog.GetAllKorisnickiNalog;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija.GetAuth
{
    [Route("/getAuth")]
    public class GetAllAuthEndpoint : MyBaseEndpoint<GetAuthRequest, GetAuthResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _authService;
        public GetAllAuthEndpoint(ApplicationDbContext applicationDbContext,
             MyAuthService authService)
        {
            _applicationDbContext = applicationDbContext;
            _authService= authService;
        }
        [HttpPost]
        public override Task<GetAuthResponse> Obradi(GetAuthRequest request)
        {
            var auth=_applicationDbContext.AuthToken.Include(x=>x.korisnickiNalog)
                .FirstOrDefault(x => x.vrijednost == request.token);
            var result = new GetAuthResponse { LogInInformacija = auth as AuthToken };
            return Task.FromResult(result);
        }
    }
}
