using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.DijagnozaDownloadFile
{
    [Route("dijagnoza/downloadFile/{dijagnozaId}")]
    public class DijagnozaDownloadEndpoint : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DijagnozaDownloadEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> DownloadFileAsync(int dijagnozaId)
        {
            string filePath=string.Empty;
            try
            {
                var dijagnoza = _applicationDbContext.Dijagnoza.Find(dijagnozaId);
                filePath = dijagnoza.NalazFilePath;
                if (filePath == null)
                {
                    return NotFound("File not found");
                }

                var memory = new MemoryStream();
                using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;

                return File(memory, "application/octet-stream", Path.GetFileName(filePath));
                
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

    }
}

