using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Doktor.Dodaj
{
    [Route("Doktor-dodaj")]
    public class DoktorDodajEndpoint : MyBaseEndpoint<DoktorDodajRequest, DoktorDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DoktorDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<DoktorDodajResponse> Obradi([FromBody] DoktorDodajRequest request)
        {
            var newObj = new Data.Models.Doktor
            {
                ImePrezime = request.ImePrezime,
                JMBG = request.JMBG,
                DatumRodjenja = request.DatumRodjenja,
                DatumZaposlenja = request.DatumZaposlenja,
                NalogId = request.NalogId,
                PoslovnaPozicijaId = request.PoslovnaPozicijaId,
                NazivKlinike = request.NazivKlinike,
                OblastMedicine = request.OblastMedicine,
                Specijalizacija = request.Specijalizacija

            };
            _applicationDbContext.Doktor.Add(newObj);

            await _applicationDbContext.SaveChangesAsync();

            return new DoktorDodajResponse
            {
                ZaposlenikID = newObj.ZaposlenikId,
            };
            
        }
    }
}

