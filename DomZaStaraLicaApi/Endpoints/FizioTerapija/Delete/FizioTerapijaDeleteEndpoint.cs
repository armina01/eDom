using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Dijagnoza.Delete;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.FizioTerapija.Delete
{
    [Route("fizioTerapija/obrisi")]
    public class FizioTerapijaDeleteEndpoint:MyBaseEndpoint<FizioTerapijaDeleteRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FizioTerapijaDeleteEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public async override Task<NoResponse> Obradi([FromQuery] FizioTerapijaDeleteRequest request)
        {
            var terapija = _applicationDbContext.FizioTerapija.FirstOrDefault(x => x.FizioTerapijaId == request.FizioTerapijaId);

            if (terapija == null)
            {
                throw new Exception("Terapija nije pronadjena za id=" + request.FizioTerapijaId);
            }

            _applicationDbContext.Remove(terapija);
            await _applicationDbContext.SaveChangesAsync();

            return new NoResponse
            {

            };
        }
    }
}

