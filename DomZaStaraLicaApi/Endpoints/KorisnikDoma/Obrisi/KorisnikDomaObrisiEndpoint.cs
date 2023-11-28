using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Obrisi
{
    [Route("korisnikDoma-obrisi")]
    public class KorisnikDomaObrisiEndpoint:MyBaseEndpoint<KorisnikDomaObrisiRequest, KorisnikDomaObrisiResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public KorisnikDomaObrisiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public override async Task<KorisnikDomaObrisiResponse> Obradi([FromQuery] KorisnikDomaObrisiRequest request)
        {

            var korisnik = _applicationDbContext.KorisnikDoma.FirstOrDefault(x => x.KorisnikDomaID == request.KorisnikDomaID);

            if (korisnik == null)
            {
                throw new Exception("nije pronadjen korisnik za id = " + request.KorisnikDomaID);
            }

            _applicationDbContext.Remove(korisnik);
            await _applicationDbContext.SaveChangesAsync();

            return new KorisnikDomaObrisiResponse
            {

            };
        }

    }
}
