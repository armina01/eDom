using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Nutricionista.DodajNutricionistu
{
    public class DodajNutricionistuEndpoint : MyBaseEndpoint<DodajNutricionistuRequest,
        DodajNutricionistuResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DodajNutricionistuEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("/dodajNutricionistu")]
        public override async Task<DodajNutricionistuResponse> Obradi([FromBody]DodajNutricionistuRequest request)
        {
            var newObj = new Data.Models.Nutricionista
            {
                ImePrezime = request.ImePrezime,
                DatumRodjenja = request.DatumRodjenja,
                DatumZaposlenja = request.DatumZaposlenja,
                JMBG = request.JMBG,
                NalogId = request.NalogId,
                PoslovnaPozicijaId = request.PoslovnaPozicijaId,
                NutricionistickiCentar = request.NutricionistickiCentar,
                OblastNutricionizma = request.OblastNutricionizma
            };
            _applicationDbContext.Nutricionista.Add(newObj);
            await _applicationDbContext.SaveChangesAsync();
            return new DodajNutricionistuResponse { ZaposlenikId = newObj.ZaposlenikId, };
        }
    }
}
