using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija._2FAuth
{
    
    public class Enable2FAuthEndpoint:MyBaseEndpoint<Enable2FAuthRequest,NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;

        public Enable2FAuthEndpoint(ApplicationDbContext applicationDbContext,
            IConfiguration configuration)
        {
            _applicationDbContext = applicationDbContext;
            _configuration = configuration;
        }
        [HttpPost("/enable2F")]
        public override Task<NoResponse> Obradi(Enable2FAuthRequest request)
        {
            var user = _applicationDbContext.KorisnickiNalog.FirstOrDefault(
                x=>x.NalogId== request.NalogId);

            if (user == null)
            {
                throw new Exception("nije pronadjen korisnicki nalog za id = " + request.NalogId);
            }

            // Generate a new 2FA secret using Speakeasy
            var secret = TokenGenerator.Generate(6);

            // Send the secret to the user via email
            var emailSender = new MyEmailSenderService(_configuration);
            string randomString = TokenGenerator.Generate(10);
            emailSender.Posalji(user.Email, "Two-Factor Authentication Secret", $"Your 2FA secret: {secret}",false);
            var noviToken = new Data.Models.AuthToken()
            {
                ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
                vrijednost = randomString,
                KorisnickiNalogId = user.NalogId,
                korisnickiNalog = user,
                vrijemeEvidentiranja = DateTime.Now,
                TwoFKey = secret
            };
            user.Je2FActive = true;
            _applicationDbContext.AuthToken.Add(noviToken);
            _applicationDbContext.SaveChanges();
            return Task.FromResult(new NoResponse { });
        }
    }
}
