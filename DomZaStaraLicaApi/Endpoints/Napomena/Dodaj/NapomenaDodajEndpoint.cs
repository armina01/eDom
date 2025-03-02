using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Endpoints.Doktor.Dodaj;
using DomZaStaraLicaApi.Helper;
using DomZaStaraLicaApi.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace DomZaStaraLicaApi.Endpoints.Napomena.Dodaj
{
    [Route("napomena/dodaj")]
    public class NapomenaDodajEndpoint : MyBaseEndpoint<NapomenaDodajRequest, NapomenaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IHubContext<SignalRHub> _hubContext;

        public NapomenaDodajEndpoint(ApplicationDbContext applicationDbContext, IHubContext<SignalRHub> hubContext)
        {
            _applicationDbContext = applicationDbContext;
            _hubContext = hubContext;
        }

        [HttpPost]
        public override async Task<NapomenaDodajResponse> Obradi([FromBody] NapomenaDodajRequest request)
        {
            var newObj = new Data.Models.Napomena
            {
                Opis = request.Opis,
                Prioritet = request.Prioritet,
                isAktivna = request.isAktivna,
                DatumPostavke = request.DatumPostavke,
                ZaposlenikId = request.ZaposlenikId,
                KorisnikDomaID = request.KorisnikDomaID,
                VrstaNapomeneId = request.VrstaNapomeneId

            };


            _applicationDbContext.Napomena.Add(newObj);
            await _applicationDbContext.SaveChangesAsync();

            var korisnik = _applicationDbContext.KorisnikDoma.Find(request.KorisnikDomaID);


            var njegovatelji = await _applicationDbContext.KorisnickiNalog
            .Where(zaposlenik => zaposlenik.JeNjegovatelj).Select(x => x.KorisnickoIme)
            .ToListAsync();

            //foreach (var njegovatelj in njegovatelji)
            //{
                await _hubContext.Clients.Group("Njegovatelji").SendAsync("dodana_nova_napomena", newObj.Opis + " za korisnika " + korisnik.ImePrezime);
            //}

            return new NapomenaDodajResponse
            {
                NapomenaId = newObj.NapomenaId
            };

        }
    }

}

