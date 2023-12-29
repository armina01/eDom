using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Autentifikacija.CheckingPassword
{
    [Route("/provjeraPassworda")]
    public class PasswordEndpoint : MyBaseEndpoint<PasswordRequest, PasswordResponse>
    {
        ApplicationDbContext _applicationDbContext;
        public PasswordEndpoint(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;  
        }
        [HttpPost]
        public async override Task<PasswordResponse> Obradi(PasswordRequest request)
        {
            bool jeTacno = false;
            var korisnickiNalog = _applicationDbContext.KorisnickiNalog.FirstOrDefault(
                x => x.NalogId == request.korisnickiNalogId
                );
            if (BCrypt.Net.BCrypt.EnhancedVerify(request.Lozinka, korisnickiNalog.Lozinka))
            {
                jeTacno = true;
            }
            return new PasswordResponse { jeIspravno = jeTacno };
        }
    }
}
