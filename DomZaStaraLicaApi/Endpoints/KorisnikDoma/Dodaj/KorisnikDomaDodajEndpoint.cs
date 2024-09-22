using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using static System.Net.Mime.MediaTypeNames;
using static System.Net.WebRequestMethods;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj
{
    [Microsoft.AspNetCore.Mvc.Route("korisnikDoma-dodaj")]
    public class KorisnikDomaDodajEndpoint : MyBaseEndpoint<KorisnikDomaDodajRequest, KorisnikDomaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public KorisnikDomaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<KorisnikDomaDodajResponse> Obradi([FromBody] KorisnikDomaDodajRequest request)
        {
            var noviObj = new Data.Models.KorisnikDoma
            {
                ImePrezime = request.ImePrezime,
                JMBG = request.JMBG,
                DatumRodjenja = request.DatumRodjenja,
                BrojSobe = request.BrojSobe,
                OpstinaID = request.OpstinaID,
                SlikaKorisnika = "https://localhost:7265" + "/ProfileImage" + "/empty.png" //provjerit 
            };

            // Prvo dodaj korisnika u bazu da se generiše ID
            _applicationDbContext.KorisnikDoma.Add(noviObj);
            await _applicationDbContext.SaveChangesAsync(); // Nakon ovoga noviObj.KorisnikDomaID će imati vrijednost

            // Ako korisnik pošalje sliku
            if (!string.IsNullOrEmpty(request.Slika_base64_format))
            {
                byte[]? slika_bajtovi = request.Slika_base64_format?.ParsirajBase64();

                if (slika_bajtovi == null)
                    throw new Exception("Pogrešan base64 format");

                var folderPath = Path.Combine("wwwroot", "slike-korisnika");
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var filePath = $"{folderPath}/{noviObj.KorisnikDomaID}.jpg";
                await System.IO.File.WriteAllBytesAsync(filePath, slika_bajtovi);

                // Ažuriraj putanju slike nakon što je slika sačuvana
                noviObj.SlikaKorisnika = $"https://localhost:7265/slike-korisnika/{noviObj.KorisnikDomaID}.jpg";

                // Sada ponovo ažuriraj korisnika u bazi da sačuvaš novu putanju slike
                _applicationDbContext.KorisnikDoma.Update(noviObj);
                await _applicationDbContext.SaveChangesAsync();
            }

            return new KorisnikDomaDodajResponse
            {
                KorisnikDomaID = noviObj.KorisnikDomaID
            };
        }
    }
}
