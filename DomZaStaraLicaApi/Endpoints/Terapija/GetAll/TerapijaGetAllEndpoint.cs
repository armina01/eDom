using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Medicine.GetAll;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Terapija.GetAll
{
    [Route("terapija/getAll")]
    public class TerapijaGetAllEndpoint:MyBaseEndpoint<NoRequest, TerapijaGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<TerapijaGetAllResponse> Obradi([FromQuery] NoRequest request)
        {
            var terapija = await _applicationDbContext.Terapija
                .OrderByDescending(x => x.TerapijaId)
                .Select(x => new TerapijaGetAllResponseTerapija()
                {
                    TerapijaId = x.TerapijaId,
                    Opis= x.Opis,
                    DoktorId= x.DoktorId,
                    KorisnikDomaID=x.KorisnikDomaID,
                    NacinPrimjene= x.NacinPrimjene,
                    VremenskiInterval= x.VremenskiInterval,
                  
                })
                .ToListAsync();

            return new TerapijaGetAllResponse
            {
                Terapije= terapija
            };
        }
    }
}

