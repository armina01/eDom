using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Njegovatelj.GetAllNjegovatelji;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Zaposlenik.GetAllZaposlenik
{
    [Route("/getAllZaposlenici")]
    public class GetAllZaposlenikEndpoint:MyBaseEndpoint<GetAllZaposlenikRequest,
        GetAllZaposlenikResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public GetAllZaposlenikEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public async override Task<GetAllZaposlenikResponse> Obradi([FromQuery]GetAllZaposlenikRequest request)
        {
            var zaposlenik = await _applicationDbContext.Zaposlenik
                .OrderByDescending(x => x.ZaposlenikId)
                .Select(x => new GetAllZaposlenikResponseZaposlenik()
                {
                    ZaposlenikId = x.ZaposlenikId,
                    ImePrezime = x.ImePrezime,
                    DatumRodjenja = x.DatumRodjenja,
                    JMBG = x.JMBG,
                    DatumZaposlenja = x.DatumZaposlenja,
                    NalogId = x.NalogId,
                    PoslovnaPozicijaId = x.PoslovnaPozicijaId

                }).ToListAsync();
            return new GetAllZaposlenikResponse
            {
                Zaposlenici = zaposlenik
            };
        }
    }
}
