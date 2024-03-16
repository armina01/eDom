using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnickiNalog.GetAllKorisnickiNalog;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.NotifikacijaZadatak.GetNotifikacijuZadatak
{
    [Route("/getNotifikacije")]
    public class GetNotifikacijuEndpoint:MyBaseEndpoint<NoRequest,GetNotificationResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GetNotifikacijuEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public override async Task<GetNotificationResponse> Obradi([FromQuery] NoRequest request)
        {
            var korisnickiNalog = await _applicationDbContext.NotifikacijaZadatak
            .OrderByDescending(x => x.NotifikacijaId)
            .Select(x => new GetNotificationResponseNotification()
            {
                NotifikacijaId = x.NotifikacijaId,
                Poruka = x.Poruka
            })
            .ToListAsync();
            return new GetNotificationResponse
            {
                Notifikacije = korisnickiNalog
            };
        }
    }
}
