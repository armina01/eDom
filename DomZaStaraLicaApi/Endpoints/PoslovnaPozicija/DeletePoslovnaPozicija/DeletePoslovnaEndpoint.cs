using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Njegovatelj.DeleteNjegovatlja;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.PoslovnaPozicija.DeletePoslovnaPozicija
{
    public class DeletePoslovnaEndpoint:MyBaseEndpoint<DeletePoslovnaPozicijaRequest,
        DeletePoslovnaPozicijaResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DeletePoslovnaEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete("/izbrisiPoslovnuPoziciju")]
        public override async Task<DeletePoslovnaPozicijaResponse> Obradi(DeletePoslovnaPozicijaRequest request)
        {
            var Pozicija = _applicationDbContext.PoslovnaPozicija.FirstOrDefault(
                x => x.PoslovnaPozicijaId == request.PoslovnaPozicijaId);
            if (Pozicija == null)
            { throw new Exception("nije pronadjena pozicija nalog za id = " + request.PoslovnaPozicijaId); }
            _applicationDbContext.Remove(Pozicija);
            await _applicationDbContext.SaveChangesAsync();
            return new DeletePoslovnaPozicijaResponse { };
        }
    }
}
