using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.KorisnickiNalog.DodajKorisnickiNalog
{
    public class DodajKorisnickiNalogEndpoint: MyBaseEndpoint<DodajKorisnickiNalogRequest,DodajKorisnickiNalogResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DodajKorisnickiNalogEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("/dodajKorisnickiNalog")]
        public override async Task<DodajKorisnickiNalogResponse> Obradi([FromBody]DodajKorisnickiNalogRequest request)
        {
            var newObj= new Data.Models.KorisnickiNalog
            { 
                KorisnickoIme = request.KorisnickoIme,
                Lozinka= EncryptPassword.encryptPassword(request.Lozinka),
                JeAdmin= request.JeAdmin,
                JeFizioterapeut= request.JeFizioterapeut,
                JeDoktor= request.JeDoktor,
                JeNjegovatelj= request.JeNjegovatelj,
                JeNutricionista= request.JeNutricionista,

            };
            _applicationDbContext.KorisnickiNalog.Add(newObj);
            await _applicationDbContext.SaveChangesAsync();
            return new DodajKorisnickiNalogResponse
            {
                KorisnikId = newObj.NalogId,
            };
        }
    }
}
