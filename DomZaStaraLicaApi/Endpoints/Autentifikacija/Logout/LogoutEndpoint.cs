using Azure.Core;
using Azure;
using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using DomZaStaraLicaApi.Data.Models;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija.Logout
{
    public class LogoutEndpoint : MyBaseEndpoint<NoRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _authService;

        public LogoutEndpoint(ApplicationDbContext applicationDbContext, MyAuthService authService)
        {
            _applicationDbContext = applicationDbContext;
            _authService = authService;
        }
        [HttpPost("logout")]
        public override async Task<NoResponse> Obradi([FromBody]NoRequest request)
        {
            AuthToken? autentifikacijaToken = _authService.GetAuthInfo().autentifikacijaToken;

            if (autentifikacijaToken == null)
                return new NoResponse();

            _applicationDbContext.Remove(autentifikacijaToken);
            await _applicationDbContext.SaveChangesAsync();
            return new NoResponse();
        }
    }
}
