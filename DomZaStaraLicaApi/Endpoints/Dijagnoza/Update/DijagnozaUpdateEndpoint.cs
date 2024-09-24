using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.Update
{
    [Route("dijagnoza/update")]
    public class DijagnozaUpdateEndpoint : MyBaseEndpoint<DijagnozaUpdateRequest, DijagnozaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public DijagnozaUpdateEndpoint(ApplicationDbContext applicationDbContext, IWebHostEnvironment hostingEnvironment)
        {
            _applicationDbContext = applicationDbContext;
            _hostingEnvironment = hostingEnvironment;

        }

        [HttpPost]
        public override async Task<DijagnozaUpdateResponse> Obradi([FromForm] DijagnozaUpdateRequest request)
        {
            var dijagnoza = _applicationDbContext.Dijagnoza.FirstOrDefault(x => x.dijagnozaId == request.dijagnozaId);
            if (dijagnoza == null)
            {
                throw new Exception("Nije pronadjena dijagnoza za id= " + request.dijagnozaId);
            }
            dijagnoza.nazivBolesti = request.nazivBolesti;
            dijagnoza.opis = request.opis;
            dijagnoza.datumDijagnoze = request.datumDijagnoze;
            dijagnoza.ZaposlenikId = request.ZaposlenikId;
            dijagnoza.KorisnikDomaID = request.KorisnikDomaID;


            // Ažuriranje fajla
            if (request.File != null && request.File.Length > 0)
            {
                // Ako već postoji fajl, obriši ga
                if (!string.IsNullOrEmpty(dijagnoza.NalazFilePath) && System.IO.File.Exists(dijagnoza.NalazFilePath))
                {
                    System.IO.File.Delete(dijagnoza.NalazFilePath);
                }

                // Spremi novi fajl
                var uploadPath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                Directory.CreateDirectory(uploadPath);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.File.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.File.CopyToAsync(stream);
                }

                dijagnoza.NalazFilePath = filePath;
            }


            await _applicationDbContext.SaveChangesAsync();

            return new DijagnozaUpdateResponse()
            {
                dijagnozaId = dijagnoza.dijagnozaId,
            };
        }

    }
}
