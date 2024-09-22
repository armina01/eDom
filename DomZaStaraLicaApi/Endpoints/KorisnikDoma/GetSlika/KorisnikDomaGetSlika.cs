using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.GetSlika
{
    [ApiController]
    [Route("korisnikDoma/getSlika")]
    public class KorisnikDomaGetSlika: ControllerBase
    {
        [HttpGet]
        public async Task<FileContentResult> GetByID(int id, CancellationToken cancellationToken)
        {
            var folderPath = "slike-korisnika";

            byte[] slika;
            try
            {
                var fileName = $"{folderPath}/{id}-velika.jpg";
                slika = await System.IO.File.ReadAllBytesAsync(fileName, cancellationToken);
                return File(slika, GetMimeType(fileName));
            }
            catch (Exception ex)
            {
                var fileName = $"wwwroot/profileImage/empty.png";
                slika = await System.IO.File.ReadAllBytesAsync(fileName, cancellationToken);
                return File(slika, GetMimeType(fileName));
            }

        }

        static string GetMimeType(string fileName)
        {
            var provider = new FileExtensionContentTypeProvider();

            if (provider.TryGetContentType(fileName, out var contentType))
            {
                return contentType;
            }

            return "application/octet-stream";
        }
    }

}

