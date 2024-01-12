using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija._2FAuth
{
    public class Auth2FOtklucajEndpoint:MyBaseEndpoint<Auth2FOtkljucajRequest,NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _authService;


        public Auth2FOtklucajEndpoint(ApplicationDbContext applicationDbContext, MyAuthService authService)
        {
            _applicationDbContext = applicationDbContext;
            _authService = authService;
        }
        [HttpPost("2f-otklucaj")]
        public override async Task<NoResponse> Obradi([FromBody] Auth2FOtkljucajRequest request)
        {
            if (!_authService.GetAuthInfo().isLogiran)
            {
                throw new Exception("nije logirani");
            }
            var token = _authService.GetAuthInfo().autentifikacijaToken;

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

            return new NoResponse();
        }

    }
}
