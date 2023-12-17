using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Zadatak.UpdateZaposlenik;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.DeleteZadatak
{
    [Route("/obrisiZadatak")]
    public class DeleteZadatakEndpoint : MyBaseEndpoint<DeleteZadatakRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DeleteZadatakEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete]
        public override async Task<NoResponse> Obradi([FromQuery] DeleteZadatakRequest request)
        {
            var zadatak = _applicationDbContext.Zadatak.FirstOrDefault(
                x => x.ZadatakId == request.ZadatakId);
            if (zadatak != null)
            {
                _applicationDbContext.Remove(zadatak);
                await _applicationDbContext.SaveChangesAsync();
                return new NoResponse();
            }
            else
            {
                throw new Exception("nije pronadjen zadatak za id = " + request.ZadatakId);
            }
        }
    }
}
