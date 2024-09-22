using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.Update
{
    [Route("korisnikDoma-update")]
    public class KorisnikDomaUpdateEndpoint:MyBaseEndpoint<KorisnikDomaUpdateRequest, KorisnikDomaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        
        public KorisnikDomaUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }


        [HttpPost]
        public override async Task<KorisnikDomaUpdateResponse> Obradi([FromBody] KorisnikDomaUpdateRequest request)
        {
            var korisnik = _applicationDbContext.KorisnikDoma.FirstOrDefault(x => x.KorisnikDomaID == request.KorisnikDomaID);

            if (korisnik == null)
            {
                throw new Exception("nije pronadjen korisnik za id = " + request.KorisnikDomaID);
            }

            korisnik.ImePrezime = request.ImePrezime;
            korisnik.BrojSobe = request.BrojSobe;
            korisnik.DatumRodjenja = request.DatumRodjenja;
            korisnik.JMBG=request.JMBG;
            korisnik.OpstinaID = request.OpstinaID;

            //update slike
            if (!string.IsNullOrEmpty(request.Slika_base64_format))
            {
                byte[]? slika_bajtovi = request.Slika_base64_format?.ParsirajBase64();

                if (slika_bajtovi == null)
                    throw new Exception("pogresan base64 format");

                var folderPath = Path.Combine("wwwroot", "slike-korisnika");
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var filePath = $"{folderPath}/{korisnik.KorisnikDomaID}.jpg";
                await System.IO.File.WriteAllBytesAsync(filePath, slika_bajtovi);

                // Ažuriraj putanju slike nakon što je slika sačuvana
                korisnik.SlikaKorisnika = $"https://localhost:7265/slike-korisnika/{korisnik.KorisnikDomaID}.jpg";

                // Sada ponovo ažuriraj korisnika u bazi da sačuvaš novu putanju slike
                _applicationDbContext.KorisnikDoma.Update(korisnik);
                await _applicationDbContext.SaveChangesAsync();
            }

            return new KorisnikDomaUpdateResponse
            {
                KorisnikDomaID = request.KorisnikDomaID
            };
        }

    }
}
