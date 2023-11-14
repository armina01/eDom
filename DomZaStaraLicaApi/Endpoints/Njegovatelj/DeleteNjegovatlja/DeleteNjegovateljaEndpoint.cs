using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Njegovatelj.DeleteNjegovatlja
{
    public class DeleteNjegovateljaEndpoint:MyBaseEndpoint<DeleteNjegovateljaRequest,
        DeleteNjegovateljaResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DeleteNjegovateljaEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete("/izbrisiNjegovatelja")]
        public override async Task<DeleteNjegovateljaResponse> Obradi(DeleteNjegovateljaRequest request)
        {
            var Njegovatelj = _applicationDbContext.Njegovatelj.FirstOrDefault(
                x => x.ZaposlenikId == request.ZaposlenikId);
            if (Njegovatelj == null)
            { throw new Exception("nije pronadjen korisnicki nalog za id = " + request.ZaposlenikId); }
            _applicationDbContext.Remove(Njegovatelj);
            await _applicationDbContext.SaveChangesAsync();
            return new DeleteNjegovateljaResponse { };
        }
    }
}
