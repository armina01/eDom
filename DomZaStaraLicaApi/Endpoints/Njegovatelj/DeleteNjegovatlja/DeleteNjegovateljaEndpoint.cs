using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Njegovatelj.DeleteNjegovatlja
{
    [Route("/izbrisiNjegovatelja")]
    public class DeleteNjegovateljaEndpoint:MyBaseEndpoint<DeleteNjegovateljaRequest,
        DeleteNjegovateljaResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DeleteNjegovateljaEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete]
        public override async Task<DeleteNjegovateljaResponse> Obradi([FromQuery]DeleteNjegovateljaRequest request)
        {
            var Njegovatelj = _applicationDbContext.Njegovatelj.FirstOrDefault(
                x => x.ZaposlenikId == request.NjegovateljId);
            if (Njegovatelj == null)
            { throw new Exception("nije pronadjen korisnicki nalog za id = " + request.NjegovateljId); }
            _applicationDbContext.Remove(Njegovatelj);
            await _applicationDbContext.SaveChangesAsync();
            return new DeleteNjegovateljaResponse { };
        }
    }
}
