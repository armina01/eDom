using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Terapija.GetAll;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.TerapijaLijek.GetAll
{
    [Route("terapijaLijek/getAll")]
    public class TerapijaLijekGetAllEndpoint:MyBaseEndpoint<NoRequest,TerapijaLijekGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaLijekGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<TerapijaLijekGetAllResponse> Obradi([FromQuery] NoRequest request)
        {
            var terapija = await _applicationDbContext.TerapijaLijek
                .OrderByDescending(x => x.TerapijaId)
                .Select(x => new TerapijaLijekGetAllResponseTerapijaLijek()
                {
                    TerapijaLijekId=x.TerapijaLijekId,
                    TerapijaId=x.TerapijaId,
                    LijekId=x.LijekId,
                    Terapija=x.Terapija,
                    Lijek=x.Lijek

                })
                .ToListAsync();

            return new TerapijaLijekGetAllResponse
            {
                TerapijeLijekovi=terapija
            };




            //var terapijeLijekovi = await _applicationDbContext.TerapijaLijek
            //   .Include(tl => tl.Lijek)
            //   .Include(tl => tl.Terapija)
            //   .ToListAsync();

            //return terapijeLijekovi;

           
        }
    }
}

