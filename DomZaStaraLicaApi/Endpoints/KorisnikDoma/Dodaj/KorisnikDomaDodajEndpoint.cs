using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using SkiaSharp;
using System.Threading;
using static System.Net.Mime.MediaTypeNames;
using static System.Net.WebRequestMethods;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj
{
    [Microsoft.AspNetCore.Mvc.Route("korisnikDoma-dodaj")]
    public class KorisnikDomaDodajEndpoint: MyBaseEndpoint<KorisnikDomaDodajRequest, KorisnikDomaDodajResponse>
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
                SlikaKorisnika = "https://localhost:7265" + "/profileImage " + "/empty.png"
            };
            _applicationDbContext.KorisnikDoma.Add(noviObj);
            await _applicationDbContext.SaveChangesAsync();

            //dodavanje slike
            if (!string.IsNullOrEmpty(request.Slika_base64_format))
            {
                byte[]? slika_bajtovi = request.Slika_base64_format?.ParsirajBase64();

                if (slika_bajtovi == null)
                    throw new Exception("pogresan base64 format");

                byte[]? slika_bajtovi_resized_velika = Slika.resize(slika_bajtovi, 200);
                if (slika_bajtovi_resized_velika == null)
                    throw new Exception("pogresan format slike");

                byte[]? slika_bajtovi_resized_mala = Slika.resize(slika_bajtovi, 50);
                if (slika_bajtovi_resized_mala == null)
                    throw new Exception("pogresan format slike");

                var folderPath = "slike-korisnika";
                if (!Directory.Exists(folderPath))
                {
                   
                    Directory.CreateDirectory(folderPath);
                }

                await System.IO.File.WriteAllBytesAsync($"{folderPath}/{noviObj.KorisnikDomaID}-velika.jpg", slika_bajtovi_resized_velika);
                await System.IO.File.WriteAllBytesAsync($"{folderPath}/{noviObj.KorisnikDomaID}-mala.jpg", slika_bajtovi_resized_mala);

                
            }


            return new KorisnikDomaDodajResponse
            {
                KorisnikDomaID=noviObj.KorisnikDomaID
            };
        }

    }
    
}
