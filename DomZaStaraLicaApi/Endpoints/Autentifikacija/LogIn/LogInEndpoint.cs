using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Helper;
using DomZaStaraLicaApi.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija.LogIn
{
    [Route("/login")]
    public class LogInEndpoint : MyBaseEndpoint<LoginRequest, LogInResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IHubContext<SignalRHub> _hubContext;
        public LogInEndpoint(ApplicationDbContext applicationDbContext, IHubContext<SignalRHub> hubContext)
        {
            _applicationDbContext = applicationDbContext;
            _hubContext = hubContext;   
        }
        [HttpPost]
        public override async Task<LogInResponse> Obradi([FromBody] LoginRequest request)
        {

           var logiraniKorisnik= _applicationDbContext.KorisnickiNalog.FirstOrDefault(
               x=> x.KorisnickoIme==request.KorisnickoIme
               && x.JeAdmin==request.JeAdmin && x.JeFizioterapeut==request.JeFizioterapeut
               && x.JeDoktor==request.JeDoktor && x.JeNjegovatelj==request.JeNjegovatelj &&
               x.JeNutricionista==request.JeNutricionista);
            if(logiraniKorisnik==null )
            {
                throw new Exception("nije pronadjen korisnicki nalog za korisnicko ime = " + request.KorisnickoIme);

            }
            if (!BCrypt.Net.BCrypt.EnhancedVerify(request.Lozinka,logiraniKorisnik.Lozinka))
            {
                throw new Exception("Lozinka ne odgovara nalogu " + request.KorisnickoIme);
            }
            string randomString = TokenGenerator.Generate(10);

            var noviToken = new AuthToken()
            {
                ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
                vrijednost = randomString,
                korisnickiNalog = logiraniKorisnik,
                vrijemeEvidentiranja = DateTime.Now
            };
            _applicationDbContext.Add(noviToken);
             await _applicationDbContext.SaveChangesAsync();

            await _hubContext.Groups.AddToGroupAsync(
          request.SignalRConnectionID,
          noviToken.korisnickiNalog.KorisnickoIme
          ); 
            return new LogInResponse { LogInInformacija = new MyAuthInfo(noviToken) };
        }
        
    }
}
