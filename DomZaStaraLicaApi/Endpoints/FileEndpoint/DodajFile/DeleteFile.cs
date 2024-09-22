using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Obrisi;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.FileEndpoint.DodajFile
{
    [Route("/deleteMyFile")]
    public class DeleteFile : MyBaseEndpoint<DeleteFileRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DeleteFile(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete]
        public async override Task<NoResponse> Obradi([FromQuery]DeleteFileRequest request)
        {
            var korisnik = _applicationDbContext.MyFiles.FirstOrDefault(x => x.FileId == request.FileId);

            if (korisnik == null)
            {
                throw new Exception("nije pronadjen korisnik za id = " + request.FileId);
            }

            _applicationDbContext.Remove(korisnik);
            await _applicationDbContext.SaveChangesAsync();

            return new NoResponse();
        }
    }
}
