using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Njegovatelj.GetAllNjegovatelji;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Nutricionista.GetAllNutricioniste
{
    [Route("/getAllNutricioniste")]
    public class GetAllNutricionisteEndpoint:MyBaseEndpoint<GetAllNutricionisteRequest,
        GetAllNutricionisteResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public GetAllNutricionisteEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public async override Task<GetAllNutricionisteResponse> Obradi([FromQuery] GetAllNutricionisteRequest request)
        {
            var nutricionisti = await _applicationDbContext.Nutricionista.Where
                (x => x.OblastNutricionizma != null)
                .OrderByDescending(x => x.ZaposlenikId)
                .Select(x => new GetAllNutricionisteResponseNutricioniste()
                {
                    ZaposlenikId = x.ZaposlenikId,
                    ImePrezime = x.ImePrezime,
                    DatumRodjenja = x.DatumRodjenja,
                    JMBG = x.JMBG,
                    DatumZaposlenja = x.DatumZaposlenja,
                    NalogId = x.NalogId,
                    PoslovnaPozicijaId = x.PoslovnaPozicijaId,
                    OblastNutricionizma=x.OblastNutricionizma,
                    NutricionistickiCentar=x.NutricionistickiCentar

                }).ToListAsync();
            return new GetAllNutricionisteResponse
            {
                Nutricionisti = nutricionisti
            };
        }
    }
}
