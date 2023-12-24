using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Terapija.Update;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.TerapijaLijek.Update
{
    [Route("terapijaLijek/update")]
    public class TerapijaLijekUpdateEndpoint:MyBaseEndpoint<TerapijaLijekUpdateRequest, TerapijaLijekUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaLijekUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<TerapijaLijekUpdateResponse> Obradi(TerapijaLijekUpdateRequest request)
        {

            var postojećaTerapija = await _applicationDbContext.Terapija
              .Include(t => t.TerapijaLijekovi)  
              .FirstOrDefaultAsync(t =>
              t.TerapijaId==request.TerapijaId);

            if (postojećaTerapija == null)
            {
                throw new Exception("nije pronadjena terapija za id = " + request.TerapijaId);
            }
            else
            {
                postojećaTerapija.Opis = request.Opis;
                postojećaTerapija.NacinPrimjene = request.NacinPrimjene;
                postojećaTerapija.VremenskiInterval = request.VremenskiInterval;

                var noviLijekovi = new List<int>(request.Lijekovi);

                foreach (var postojećiTerapijaLijek in postojećaTerapija.TerapijaLijekovi.ToList())
                {
                    // Ako lijek nije u novom popisu, uklonite ga
                    if (!noviLijekovi.Contains((int)postojećiTerapijaLijek.LijekId))
                    {
                        _applicationDbContext.TerapijaLijek.Remove(postojećiTerapijaLijek);
                    }
                    else
                    {
                        // Ako je lijek već prisutan u terapiji, uklonite ga iz novog popisa
                        noviLijekovi.Remove((int)postojećiTerapijaLijek.LijekId);
                    }
                }

                // Dodajte nove lijekove koji su ostali u novom popisu
                foreach (var lijekId in noviLijekovi)
                {
                    var lijek = await _applicationDbContext.Lijek.FindAsync(lijekId);
                    if (lijek == null)
                    {
                        throw new Exception($"Lijek s ID {lijekId} nije pronađen.");
                    }

                    postojećaTerapija.TerapijaLijekovi.Add(new DomZaStaraLicaApi.Data.Models.TerapijaLijek { Lijek = lijek });
                }

                // Sada ažurirajte sve promjene u bazi podataka
                await _applicationDbContext.SaveChangesAsync();

            }

            return new TerapijaLijekUpdateResponse
            {
               TerapijaId= postojećaTerapija.TerapijaId
            };

        }
    }
}

