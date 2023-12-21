using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Endpoints.Opstina.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.DodajZaposlenika
{
    [Route("/dodajZadatak")]
    public class DodajZadatakEndpoint : MyBaseEndpoint<DodajZadatakRequest
        , DodajZadatakRespose>
    {
        ApplicationDbContext _applicationDbContext;
        public DodajZadatakEndpoint(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public async override Task<DodajZadatakRespose> Obradi(DodajZadatakRequest request)
        {
            var newZadatak = new Data.Models.Zadatak
            {
                Opis = request.Opis,
                Status = request.Status,
                DatumPostavke = request.DatumPostavke,
                ZaposlenikPostavioId = request.ZaposlenikPostavioId,
                ZaposlenikEditovaoId = request.ZaposlenikEditovaoId,
                IntervalZadatkaId = request.IntervalZadatkaId,
                VrstaZadatkaId = request.VrstaZadatkaId,
                KorisnikDomaId=request.KorisnikDomaId
                
            };
            _applicationDbContext.Zadatak.Add(newZadatak);

            await _applicationDbContext.SaveChangesAsync();

            return new DodajZadatakRespose
            {
                ZadatakId=newZadatak.ZadatakId,
            };
        }
    }
}
