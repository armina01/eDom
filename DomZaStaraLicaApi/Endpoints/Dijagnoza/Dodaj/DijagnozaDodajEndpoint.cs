using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.Dodaj
{
    [Route("dijagnoza/dodaj")]
    public class DijagnozaDodajEndpoint : MyBaseEndpoint<DijagnozaDodajRequest, DijagnozaDodajResponse>
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ApplicationDbContext _applicationDbContext;

        public DijagnozaDodajEndpoint(ApplicationDbContext applicationDbContext, IWebHostEnvironment hostingEnvironment)
        {
            _applicationDbContext = applicationDbContext;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public override async Task<DijagnozaDodajResponse> Obradi([FromForm] DijagnozaDodajRequest request)
        {
            
            var noviObj = new Data.Models.Dijagnoza
            {
                nazivBolesti = request.nazivBolesti,
                opis = request.opis,
                datumDijagnoze = request.datumDijagnoze,
                ZaposlenikId = request.ZaposlenikId,
                KorisnikDomaID=request.KorisnikDomaID
            };

            if (request.File != null && request.File.Length > 0)
            {
                var uploadPath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                Directory.CreateDirectory(uploadPath);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.File.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.File.CopyToAsync(stream);
                }

                noviObj.NalazFilePath = filePath;
            }

            _applicationDbContext.Add(noviObj);
            await _applicationDbContext.SaveChangesAsync();

            return new DijagnozaDodajResponse
            {
                dijagnozaId=noviObj.dijagnozaId
            };
        }

    }
}