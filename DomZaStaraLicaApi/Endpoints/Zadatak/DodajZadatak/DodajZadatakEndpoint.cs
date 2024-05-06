using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Endpoints.Opstina.Dodaj;
using DomZaStaraLicaApi.Helper;
using DomZaStaraLicaApi.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.DodajZaposlenika
{
    [Route("/dodajZadatak")]
    public class DodajZadatakEndpoint : MyBaseEndpoint<DodajZadatakRequest
        , DodajZadatakRespose>
    {
        ApplicationDbContext _applicationDbContext;
        private readonly IHubContext<SignalRHub> _hubContext;
        public DodajZadatakEndpoint(ApplicationDbContext applicationDbContext, IHubContext<SignalRHub> hubContext)
        {
            this._applicationDbContext = applicationDbContext;
            _hubContext = hubContext;
        }
        [HttpPost]
        public async override Task<DodajZadatakRespose> Obradi(DodajZadatakRequest request)
        {
            var newZadatak = new Data.Models.Zadatak
            {
                Opis = request.Opis,
                Status = request.Status,
                DatumPostavke = request.DatumPostavke,
                ZaposlenikPostavioId = request.ZaposlenikPostavioId,
                ZaposlenikEditovaoId = request.ZaposlenikEditovaoId,
                IntervalZadatkaId = request.IntervalZadatkaId,
                VrstaZadatkaId = request.VrstaZadatkaId,
                KorisnikDomaId=request.KorisnikDomaId
                
            };
            var imeKorisnika = _applicationDbContext.KorisnikDoma.Find(request.KorisnikDomaId);
            
            _applicationDbContext.Zadatak.Add(newZadatak);

            await _applicationDbContext.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("dodan_novi_zadatak", "zadatak dodan " + newZadatak.Opis + " za korisnika " + imeKorisnika.ImePrezime);
            return new DodajZadatakRespose
            {
                ZadatakId=newZadatak.ZadatakId,
            };
        }
    }
}
