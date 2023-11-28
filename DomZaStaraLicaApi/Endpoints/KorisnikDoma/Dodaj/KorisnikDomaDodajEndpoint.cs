using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj
{
    [Microsoft.AspNetCore.Mvc.Route("korisnikDoma-dodaj")]
    public class KorisnikDomaDodajEndpoint: MyBaseEndpoint<KorisnikDomaDodajRequest, KorisnikDomaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public KorisnikDomaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<KorisnikDomaDodajResponse> Obradi([FromBody] KorisnikDomaDodajRequest request)
        {
            var noviObj = new Data.Models.KorisnikDoma
            {
                ImePrezime= request.ImePrezime,
                JMBG= request.JMBG,
                DatumRodjenja= request.DatumRodjenja,
                BrojSobe= request.BrojSobe,
                OpstinaID= request.OpstinaID
            };
            _applicationDbContext.KorisnikDoma.Add(noviObj);

            await _applicationDbContext.SaveChangesAsync();

            return new KorisnikDomaDodajResponse
            {
                KorisnikDomaID=noviObj.KorisnikDomaID
            };
        }

    }
}
