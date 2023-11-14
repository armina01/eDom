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
                x => x.KorisnikId == request.KorisnikId);
            if (nalog == null) { throw new Exception("nije pronadjen korisnicki nalog za id = " + request.KorisnikId); }
            nalog.KorisnickoIme = request.KorisnickoIme;
            nalog.Lozinka= EncryptPassword.encryptPassword(request.Lozinka);
            nalog.JeAdmin=request.JeAdmin;
            nalog.JeDoktor=request.JeDoktor;
            nalog.JeNjegovatelj=request.JeNjegovatelj;
            nalog.JeNutricionista=request.JeNutricionista;
            nalog.JeFizioterapeut = request.JeFizioterapeut;
            await _applicationDbContext.SaveChangesAsync();
            return new UpdateKorisnickiNalogResponse
            { KorisnikId = nalog.KorisnikId };
        }
    }
}
