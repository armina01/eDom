using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.GetAllZadatak
{
    [Route("/getAllZadatak")]
    public class GetAllZadatakEndpoint : MyBaseEndpoint<
    GetAllZadatakRequest, GetAllZadatakResponse>
    {
        ApplicationDbContext _applicationDbContext;
        public GetAllZadatakEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public async override Task<GetAllZadatakResponse> Obradi([FromQuery]GetAllZadatakRequest request)
        {
            var zadatak = await _applicationDbContext.Zadatak
               .OrderByDescending(x => x.ZadatakId)
               .Select(x => new GetAllZadatakResponseZadatak()
               {
                   ZadatakId = x.ZadatakId,
                   DatumPostavke = x.DatumPostavke,
                   Opis = x.Opis,
                   IntervalZadatkaId = x.IntervalZadatkaId,
                   Status = x.Status,
                   VrstaZadatkaId = x.VrstaZadatkaId,
                   ZaposlenikEditovaoId = x.ZaposlenikEditovaoId,
                   ZaposlenikPostavioId = x.ZaposlenikPostavioId,
                   KorisnikDomaId=x.KorisnikDomaId
               }).ToListAsync();
            return new GetAllZadatakResponse
            {
                Zadaci = zadatak
            };
        }
    }
   
}
