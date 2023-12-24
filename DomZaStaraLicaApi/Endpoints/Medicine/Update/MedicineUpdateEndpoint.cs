using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Medicine.Update
{
    [Route("lijek/update")]
    public class MedicineUpdateEndpoint:MyBaseEndpoint<MedicineUpdateRequest, MedicineUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public MedicineUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public override async Task<MedicineUpdateResponse> Obradi(MedicineUpdateRequest request)
        {

            var lijek = _applicationDbContext.Lijek.FirstOrDefault(x=>x.LijekId==request.LijekId);

            if (lijek == null)
            {
                throw new Exception("nije pronadjen lijek za id = " + request.LijekId);
            }

            lijek.Naziv=request.Naziv;
            lijek.Uputstvo=request.Uputstvo;

            await _applicationDbContext.SaveChangesAsync();

            return new MedicineUpdateResponse
            {
                LijekId = request.LijekId
            };

        }
    }
}
