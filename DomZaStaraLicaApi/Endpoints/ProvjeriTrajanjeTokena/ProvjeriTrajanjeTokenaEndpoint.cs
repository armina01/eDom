using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.ProvjeriTrajanjeTokena
{
    [Route("ProvjeraTokena")]
    [ApiController]
    public class ProvjeriTrajanjeTokenaEndpoint : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _myAuth;

        public ProvjeriTrajanjeTokenaEndpoint(ApplicationDbContext applicationDbContext, MyAuthService myAuth)
        {
            _applicationDbContext = applicationDbContext;
            _myAuth = myAuth;
        }

        [HttpPost("Provjeri")]
        public async Task<ActionResult<ProvjeriTrajanjeTokenaResponse>> ProvjeriTrajanjeTokena([FromHeader(Name = "my-auth-token")] string oldToken, CancellationToken cancellationToken)
        {
            var trenutnoPrijavljenToken = await _applicationDbContext.AuthToken
                .Where(x => x.vrijednost == oldToken)
                .Include(x => x.korisnickiNalog)
                .FirstOrDefaultAsync();
            if (trenutnoPrijavljenToken == null)
            {
                return Ok(new ProvjeriTrajanjeTokenaResponse { Poruka = "Niste prijavljeni!" });
            }
            else
            {
                TimeSpan trajanje = TimeSpan.FromMinutes(2); //trajanje tokena

                DateTime vrijemeIsteka = trenutnoPrijavljenToken.vrijemeEvidentiranja.Add(trajanje);

                if (DateTime.Now > vrijemeIsteka)
                {
                    string noviToken = TokenGenerator.Generate(10);

                    _applicationDbContext.Remove(trenutnoPrijavljenToken);

                    trenutnoPrijavljenToken.vrijednost = noviToken;
                    trenutnoPrijavljenToken.vrijemeEvidentiranja = DateTime.Now;

                    _applicationDbContext.AuthToken.Update(trenutnoPrijavljenToken);
                    await _applicationDbContext.SaveChangesAsync(cancellationToken);


                    return Ok(new ProvjeriTrajanjeTokenaResponse
                    {
                        Poruka = "Generisan novi token!",
                        Istekao = true,
                        NoviToken = trenutnoPrijavljenToken.vrijednost,
                        autentifikacijaToken = trenutnoPrijavljenToken,
                    });

                }
                else
                {
                    return Ok(new ProvjeriTrajanjeTokenaResponse
                    {
                        Poruka = "Token nije istekao!",
                        Istekao = false,
                        NoviToken = trenutnoPrijavljenToken.vrijednost,
                        autentifikacijaToken = trenutnoPrijavljenToken
                    });
                }
            }

        }
    }

}

