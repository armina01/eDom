using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija._2FAuth
{
    public class Auth2FOtklucajEndpoint:MyBaseEndpoint<Auth2FOtkljucajRequest, AuthToken>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _authService;


        public Auth2FOtklucajEndpoint(ApplicationDbContext applicationDbContext, MyAuthService authService)
        {
            _applicationDbContext = applicationDbContext;
            _authService = authService;
        }
        [HttpPost("2f-otklucaj")]
        public override async Task<AuthToken> Obradi([FromBody] Auth2FOtkljucajRequest request)
        {
            
            var token = _applicationDbContext.AuthToken
                        .Include(x => x.korisnickiNalog)
                        .Where(x => x.korisnickiNalog.KorisnickoIme == request.username)
                        .OrderBy(x => x.id)  // Assuming 'CreationTime' is a property of AuthToken
                        .LastOrDefault();

            if (token is null)
                throw new ArgumentNullException(nameof(token));


            if (request.Kljuc == token.TwoFKey)
            {
                token.Is2FOtkljucano = true;
                await _applicationDbContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Netacan kljuc");
            }

            return token;
        }

    }
}
