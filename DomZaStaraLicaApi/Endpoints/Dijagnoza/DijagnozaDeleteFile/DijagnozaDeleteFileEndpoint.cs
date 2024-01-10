using DomZaStaraLicaApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.DijagnozaDeleteFile
{
    [Route("dijagnoza/deleteFile/{dijagnozaId}")]
    public class DijagnozaDeleteFileEndpoint : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DijagnozaDeleteFileEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFileAsync(int dijagnozaId)
        {
            string filePath = string.Empty;
            try
            {
                var dijagnoza = _applicationDbContext.Dijagnoza.FirstOrDefault(x => x.dijagnozaId == dijagnozaId);
                filePath = dijagnoza.NalazFilePath;
                if (filePath == null)
                {
                    return NotFound("File not found");
                }

                System.IO.File.Delete(filePath);
                dijagnoza.NalazFilePath = null;
                _applicationDbContext.SaveChanges();

                return Ok("Fajl uspešno obrisan.");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

    }
}

