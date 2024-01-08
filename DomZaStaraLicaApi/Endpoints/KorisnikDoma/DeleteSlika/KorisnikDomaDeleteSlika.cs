using DomZaStaraLicaApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.DeleteSlika
{
    [Route("korisnikDoma/obrisiSliku")]
    public class KorisnikDomaDeleteSlika: ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public KorisnikDomaDeleteSlika(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public async Task<IActionResult> ObrisiSlikuKorisnika(int korisnikDomaID)
        {
            try
            {
                var korisnik = await _applicationDbContext.KorisnikDoma.FindAsync(korisnikDomaID);
                if (korisnik != null && !string.IsNullOrEmpty(korisnik.SlikaKorisnika))
                {
                    var folderPath = "slike-korisnika";
                    var fileNameVelika = $"{folderPath}/{korisnikDomaID}-velika.jpg";
                    var fileNameMala = $"{folderPath}/{korisnikDomaID}-mala.jpg";

                    // Obriši veliku sliku
                    if (System.IO.File.Exists(fileNameVelika))
                    {
                        System.IO.File.Delete(fileNameVelika);
                    }

                    // Obriši malu sliku
                    if (System.IO.File.Exists(fileNameMala))
                    {
                        System.IO.File.Delete(fileNameMala);
                    }

                    // Ažuriraj putanju u bazi podataka na defaultnu sliku
                    korisnik.SlikaKorisnika = "https://localhost:7265/profileImage/empty.png";
                    await _applicationDbContext.SaveChangesAsync();
                    

                    return Ok(new { Message = "Slika korisnika uspješno obrisana." });
                }
                else
                {
                    return NotFound(new { Message = "Korisnik ili slika nisu pronađeni." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Greška prilikom brisanja slike korisnika: {ex.Message}" });
            }
        }
    }
}
