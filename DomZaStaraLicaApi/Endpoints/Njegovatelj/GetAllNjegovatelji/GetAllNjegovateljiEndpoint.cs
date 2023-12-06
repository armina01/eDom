using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.GetAll;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Njegovatelj.GetAllNjegovatelji
{
    [Route("/getAllNjegovatelji")]
    public class GetAllNjegovateljiEndpoint:MyBaseEndpoint<
        GetAllNjegovateljiRequest,GetAllNjegovateljiResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public GetAllNjegovateljiEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext=applicationDbContext;
        }
        [HttpGet]
        public async override Task<GetAllNjegovateljiResponse> Obradi([FromQuery] GetAllNjegovateljiRequest request)
        {
            var njegovatelj = await _applicationDbContext.Njegovatelj.Where
                (x=>x.isMedicinskiTehnicar!=null)
                .OrderByDescending(x => x.ZaposlenikId)
                .Select(x => new GetAllNjegovateljiResponseNjegovatelj()
                {
                    ZaposlenikId = x.ZaposlenikId,
                    ImePrezime = x.ImePrezime,
                    DatumRodjenja = x.DatumRodjenja,
                    JMBG = x.JMBG,
                    DatumZaposlenja = x.DatumZaposlenja,
                    NalogId= x.NalogId,
                    PoslovnaPozicijaId = x.PoslovnaPozicijaId,
                    brojPacijenata = x.brojPacijenata,
                    isMedicinskiTehnicar = x.isMedicinskiTehnicar,
                    isNjegovatelj = x.isNjegovatelj,

                }).ToListAsync();
            return new GetAllNjegovateljiResponse
            {
                Njegovatelji = njegovatelj
            };
        }
    }
}
