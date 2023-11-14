using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.PoslovnaPozicija.UpdatePoslovnePozicije
{
    public class UpdatePoslovnePozicijeEndpoint: MyBaseEndpoint<UpdatePoslovnePozicijeRequest,
        UpdatePoslovnePozicijeResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public UpdatePoslovnePozicijeEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("updatePoslovnePozicije")]
        public override async Task<UpdatePoslovnePozicijeResponse> Obradi(UpdatePoslovnePozicijeRequest request)
        {
            var Pozicija = _applicationDbContext.PoslovnaPozicija.FirstOrDefault(
                x => x.PoslovnaPozicijaId == request.PoslovnaPozicijaId);
            if (Pozicija == null) { throw new Exception("Pozicija nije pronadjena sa vasim Idom"); }
            await _applicationDbContext.SaveChangesAsync();
            return new UpdatePoslovnePozicijeResponse
            { PoslovnaPozicijaId = Pozicija.PoslovnaPozicijaId };

        }
    }
}
