using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Update
{
    [Route("korisnikDoma-update")]
    public class KorisnikDomaUpdateEndpoint:MyBaseEndpoint<KorisnikDomaUpdateRequest, KorisnikDomaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        
        public KorisnikDomaUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }


        [HttpPost]
        public override async Task<KorisnikDomaUpdateResponse> Obradi([FromBody] KorisnikDomaUpdateRequest request)
        {
            var korisnici = _applicationDbContext.KorisnikDoma.FirstOrDefault(x => x.KorisnikDomaID == request.KorisnikDomaID);

            if (korisnici == null)
            {
                throw new Exception("nije pronadjen korisnik za id = " + request.KorisnikDomaID);
            }

            korisnici.ImePrezime = request.ImePrezime;
            korisnici.BrojSobe = request.BrojSobe;
            korisnici.DatumRodjenja = request.DatumRodjenja;
            korisnici.JMBG=request.JMBG;
            korisnici.OpstinaID = request.OpstinaID;

            await _applicationDbContext.SaveChangesAsync();

            return new KorisnikDomaUpdateResponse
            {
               KorisnikDomaID=request.KorisnikDomaID
            };
        }

    }
}
