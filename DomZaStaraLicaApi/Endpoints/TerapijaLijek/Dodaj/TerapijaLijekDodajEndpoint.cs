using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Endpoints.Terapija.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.TerapijaLijek.Dodaj
{
    [Route("terapijaLijek/dodaj")]
    public class TerapijaLijekDodajEndpoint : MyBaseEndpoint<TerapijaLijekDodajRequest, IActionResult>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaLijekDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<IActionResult> Obradi([FromBody] TerapijaLijekDodajRequest request)
        {


            if (request == null || request.Lijekovi == null || request.Lijekovi.Count == 0)
            {
                return BadRequest("Neispravni podaci terapije.");
            }

            var novaTerapija = new DomZaStaraLicaApi.Data.Models.Terapija
            {
                Opis = request.Opis,
                DoktorId = request.DoktorId,
                KorisnikDomaID = request.KorisnikDomaID,
                NacinPrimjene = request.NacinPrimjene,
                VremenskiInterval = request.VremenskiInterval,

                TerapijaLijekovi = new List<DomZaStaraLicaApi.Data.Models.TerapijaLijek>()

            };

            foreach (var lijekId in request.Lijekovi)
            {
                var lijek = await _applicationDbContext.Lijek.FindAsync(lijekId);
                if (lijek == null)
                {
                    return NotFound($"Lijek s ID {lijekId} nije pronađen.");
                }

                novaTerapija.TerapijaLijekovi.Add(new DomZaStaraLicaApi.Data.Models.TerapijaLijek { Lijek = lijek });
            }

            _applicationDbContext.Terapija.Add(novaTerapija);
            await _applicationDbContext.SaveChangesAsync();

            return Ok("Terapija uspješno dodana s lijekovima.");
        }
    }
}

    

