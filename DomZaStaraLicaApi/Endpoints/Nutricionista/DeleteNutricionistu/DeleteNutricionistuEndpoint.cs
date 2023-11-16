using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Nutricionista.DeleteNutricionistu
{
    public class DeleteNutricionistuEndpoint:MyBaseEndpoint<DeleteNutricionistuRequest,
        DeleteNutricionistuResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DeleteNutricionistuEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete("/izbrisiKorisnickiNalog")]
        public override async Task<DeleteNutricionistuResponse> Obradi(DeleteNutricionistuRequest request)
        {
            var nutricionista = _applicationDbContext.Nutricionista.FirstOrDefault(
                x => x.ZaposlenikId == request.ZaposlenikId);
            _applicationDbContext.Remove(nutricionista);
            await _applicationDbContext.SaveChangesAsync();
            return new DeleteNutricionistuResponse { };
        }
    }
}
