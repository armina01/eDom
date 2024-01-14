using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Medicine.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Terapija.Dodaj
{
    [Route("terapija/dodaj")]
    public class TerapijaDodajEndpoint:MyBaseEndpoint<TerapijaDodajRequest, TerapijaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<TerapijaDodajResponse> Obradi([FromBody] TerapijaDodajRequest request)
        {
            var newObj = new Data.Models.Terapija
            {

                Opis = request.Opis,
                DoktorId=request.DoktorId,
                KorisnikDomaID=request.KorisnikDomaID,
                NacinPrimjene=request.NacinPrimjene,
                VremenskiInterval=request.VremenskiInterval,
               
            };
            _applicationDbContext.Terapija.Add(newObj);

            await _applicationDbContext.SaveChangesAsync();

            return new TerapijaDodajResponse
            {
                TerapijaId=newObj.TerapijaId
            };

        }
    }
}
