using Azure.Core;
using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace DomZaStaraLicaApi.Endpoints.FileEndpoint.DodajFile
{
    [Route("/uploadFile")]
    public class DodajFileEndpoint:MyBaseEndpoint<IFormFile, IActionResult>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DodajFileEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("upload")]
        public async override Task<IActionResult> Obradi(IFormFile file)
        {
            

                if (file == null || file.Length == 0)
                {
                    return BadRequest("Invalid file");
                }

                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileEntity = new Data.Models.MyFile
                    {
                        MojFile = ms.ToArray(),
                        ImeFile=file.FileName
                    };

                    _applicationDbContext.MyFiles.Add(fileEntity);
                    await _applicationDbContext.SaveChangesAsync();
                     return Ok(new { FileId = fileEntity.FileId });
                }

               
            
        }

        [HttpGet("downloadFile/{fileId}")]
        public IActionResult DownloadFile(int fileId)
        {
            try
            {
                var fileEntity = _applicationDbContext.MyFiles.Find(fileId);

                if (fileEntity == null)
                {
                    return NotFound("File not found");
                }

                return File(fileEntity.MojFile, "application/octet-stream", fileEntity.ImeFile);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
