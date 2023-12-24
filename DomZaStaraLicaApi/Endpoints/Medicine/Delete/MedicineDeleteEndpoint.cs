using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Medicine.Delete
{
    [Route("lijek/obrisi")]
    public class MedicineDeleteEndpoint:MyBaseEndpoint<MedicineDeleteRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public MedicineDeleteEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public override async Task<NoResponse> Obradi([FromQuery] MedicineDeleteRequest request)
        {

            var lijek = _applicationDbContext.Lijek.FirstOrDefault(x => x.LijekId==request.LijekId);

            if (lijek == null)
            {
                throw new Exception("nije pronadjen lijek za id = " + request.LijekId);
            }

            _applicationDbContext.Remove(lijek);
            await _applicationDbContext.SaveChangesAsync();

            return new NoResponse
            {

            };
        }
    }
}
