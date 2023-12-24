using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Lijek.Delete;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Terapija.Delete
{
    [Route("terapija/obrisi")]
    public class TerapijaDeleteEndpoint:MyBaseEndpoint<TerapijaDeleteRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaDeleteEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public override async Task<NoResponse> Obradi([FromQuery] TerapijaDeleteRequest request)
        {

            var terapija = _applicationDbContext.Terapija.FirstOrDefault(x => x.TerapijaId==request.TerapijaId);

            if (terapija == null)
            {
                throw new Exception("nije pronadjena terapija za id = " + request.TerapijaId);
            }

            _applicationDbContext.Remove(terapija);
            await _applicationDbContext.SaveChangesAsync();

            return new NoResponse
            {

            };
        }
    }
}
