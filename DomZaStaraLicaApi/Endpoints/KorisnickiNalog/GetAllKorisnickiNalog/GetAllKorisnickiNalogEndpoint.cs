using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace DomZaStaraLicaApi.Endpoints.KorisnickiNalog.GetAllKorisnickiNalog
{
    [Route("get-all-KorisnickiNalog")]
    public class GetAllKorisnickiNalogEndpoint:MyBaseEndpoint<GetAllKorisnickiNalogRequest,
        GetAllKorisnickiNalogResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GetAllKorisnickiNalogEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public override async Task<GetAllKorisnickiNalogResponse> Obradi([FromQuery]GetAllKorisnickiNalogRequest request)
        {
            var korisnickiNalog = await _applicationDbContext.KorisnickiNalog
            .OrderByDescending(x => x.NalogId)
            .Select(x => new GetAllKorisnickiNalogResponseKorisnickiNalog()
            {
                NalogId=x.NalogId,
                KorisnickoIme=x.KorisnickoIme,
                Lozinka=x.Lozinka,
                JeDoktor=x.JeDoktor,
                JeFizioterapeut=x.JeFizioterapeut,
                JeNjegovatelj=x.JeNjegovatelj,
                JeNutricionista=x.JeNutricionista,
            })
            .ToListAsync();
            return new GetAllKorisnickiNalogResponse
            {
                KorisnickiNalozi = korisnickiNalog
            };
        }
    }
}
