using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Terapija.Delete;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.TerapijaLijek.Delete
{
    [Route("terapijaLijek/obrisi")]
    public class TerapijaLijekDeleteEndpoint:MyBaseEndpoint<TerapijaLijekDeleteRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaLijekDeleteEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public override async Task<NoResponse> Obradi([FromQuery] TerapijaLijekDeleteRequest request)
        {

            var terapija = await _applicationDbContext.Terapija
             .Include(t => t.TerapijaLijekovi) // Uključuje povezane TerapijaLijekovi zapise
             .FirstOrDefaultAsync(t => t.TerapijaId == request.TerapijaId);

            if (terapija == null)
            {
               throw new Exception($"Terapija s ID {request.TerapijaId} nije pronađena.");
            }

            _applicationDbContext.Terapija.Remove(terapija);

            foreach (var terapijaLijek in terapija.TerapijaLijekovi)
            {
                _applicationDbContext.TerapijaLijek.Remove(terapijaLijek);
            }

            await _applicationDbContext.SaveChangesAsync();

            

            return new NoResponse
            {

            };
        }
    }
}
