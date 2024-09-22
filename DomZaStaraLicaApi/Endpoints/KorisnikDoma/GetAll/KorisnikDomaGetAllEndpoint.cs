using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.GetAll
{
    [Route("korisnikDoma-getAll")]
    public class KorisnikDomaGetAllEndpoint:MyBaseEndpoint<KorisnikDomaGetAllRequest, KorisnikDomaGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public KorisnikDomaGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public override async Task<KorisnikDomaGetAllResponse> Obradi([FromQuery] KorisnikDomaGetAllRequest request)
        {
            var korisnik = await _applicationDbContext.KorisnikDoma
                .OrderByDescending(x => x.KorisnikDomaID)
                .Select(x => new KorisnikDomaGetAllKorisnik()
                {
                    KorisnikDomaID = x.KorisnikDomaID,
                    ImePrezime = x.ImePrezime,
                    DatumRodjenja = x.DatumRodjenja,
                    JMBG = x.JMBG,
                    BrojSobe = x.BrojSobe,
                    OpstinaID = x.OpstinaID,
                    OpstinaNaziv = x.Opstina.NazivOpstine,
                    OpstinaBroj = x.Opstina.PostanskiBroj,
                    SlikaKorisnika=x.SlikaKorisnika
                })
                .ToListAsync();

            return new KorisnikDomaGetAllResponse
            {
                Korisnici = korisnik
            };
        }
    }





}

