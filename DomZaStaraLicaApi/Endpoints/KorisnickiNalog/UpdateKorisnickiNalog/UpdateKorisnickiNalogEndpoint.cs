using BCrypt.Net;
using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.KorisnickiNalog.UpdateKorisnickiNalog
{
    public class UpdateKorisnickiNalogEndpoint: MyBaseEndpoint<UpdateKorisnickiNalogRequest,UpdateKorisnickiNalogResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public UpdateKorisnickiNalogEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("updateNaloga")]
        public override async Task<UpdateKorisnickiNalogResponse> Obradi(UpdateKorisnickiNalogRequest request)
        {
            var nalog = _applicationDbContext.KorisnickiNalog.FirstOrDefault(
                x => x.NalogId == request.NalogId);
            if (nalog == null) { throw new Exception("nije pronadjen korisnicki nalog za id = " + request.NalogId); }
            nalog.KorisnickoIme = request.KorisnickoIme;
            nalog.Lozinka= BCrypt.Net.BCrypt.EnhancedHashPassword(request.Lozinka, 13);
            nalog.JeAdmin=request.JeAdmin;
            nalog.JeDoktor=request.JeDoktor;
            nalog.JeNjegovatelj=request.JeNjegovatelj;
            nalog.JeNutricionista=request.JeNutricionista;
            nalog.JeFizioterapeut = request.JeFizioterapeut;
            nalog.Email=request.Email;
            await _applicationDbContext.SaveChangesAsync();
            return new UpdateKorisnickiNalogResponse
            { KorisnikId = nalog.NalogId };
        }
    }
}
