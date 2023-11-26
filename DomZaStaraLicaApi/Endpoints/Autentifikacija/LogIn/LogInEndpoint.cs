using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija.LogIn
{
    public class LogInEndpoint : MyBaseEndpoint<LoginRequest, LogInResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public LogInEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("login")]
        public override async Task<LogInResponse> Obradi(LoginRequest request)
        {

           var logiraniKorisnik=_applicationDbContext.KorisnickiNalog.FirstOrDefault(
               x=> x.KorisnickoIme==request.KorisnickoIme && request.Lozinka==x.Lozinka
               && x.JeAdmin==request.JeAdmin && x.JeFizioterapeut==request.JeFizioterapeut
               && x.JeDoktor==request.JeDoktor && x.JeNjegovatelj==request.JeNjegovatelj &&
               x.JeNutricionista==request.JeNutricionista);
            if(logiraniKorisnik==null)
            {
                throw new Exception("nije pronadjen korisnicki nalog za korisnicko ime = " + request.KorisnickoIme);

            }
            await _applicationDbContext.SaveChangesAsync();
            return new LogInResponse { NalogId = logiraniKorisnik.NalogId };
        }
        
    }
}
