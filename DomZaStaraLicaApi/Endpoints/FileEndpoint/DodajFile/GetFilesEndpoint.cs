using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.FileEndpoint.DodajFile
{
    [Route("/getAllFiles")]
    public class GetFilesEndpoint:MyBaseEndpoint<NoRequest,GetFileResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GetFilesEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async override Task<GetFileResponse> Obradi([FromQuery] NoRequest request)
        {
            var filesWithDetails = await _applicationDbContext.MyFiles
                    .OrderByDescending(x=>x.FileId)
                   .Select(file => new GetFileResponseFile
                   {
                       FileId = file.FileId,
                       ImeFile = file.ImeFile
                   })
                   .ToListAsync();
            return new GetFileResponse { Files = filesWithDetails };
        }
    }
}

