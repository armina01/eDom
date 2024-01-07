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

                await System.IO.File.WriteAllBytesAsync($"{folderPath}/{request.KorisnikDomaID}-velika.jpg", slika_bajtovi_resized_velika);
                await System.IO.File.WriteAllBytesAsync($"{folderPath}/{korisnik.KorisnikDomaID}-mala.jpg", slika_bajtovi_resized_mala);


            }

            await _applicationDbContext.SaveChangesAsync();

            return new KorisnikDomaUpdateResponse
            {
               KorisnikDomaID=request.KorisnikDomaID
            };
        }

    }
}
