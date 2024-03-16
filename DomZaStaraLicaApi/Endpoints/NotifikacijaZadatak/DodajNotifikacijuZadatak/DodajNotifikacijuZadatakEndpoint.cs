using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Zadatak.DodajZaposlenika;
using DomZaStaraLicaApi.Helper;
using DomZaStaraLicaApi.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DomZaStaraLicaApi.Endpoints.NotifikacijaZadatak.DodajNotifikacijuZadatak
{
    [Route("dodaj-notifikaciju")]
    public class DodajNotifikacijuZadatakEndpoint:MyBaseEndpoint<DodajNotifikacijuZadatakRequest,NoResponse>
    {
        ApplicationDbContext _applicationDbContext;
        public DodajNotifikacijuZadatakEndpoint(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public async override Task<NoResponse> Obradi(DodajNotifikacijuZadatakRequest request)
        {
            var newNotification = new Data.Models.NotifikacijaZadatak
            {
                Poruka = request.Poruka

            };
            _applicationDbContext.NotifikacijaZadatak.Add(newNotification);

            await _applicationDbContext.SaveChangesAsync();

            return new NoResponse();
        }
    }
}
