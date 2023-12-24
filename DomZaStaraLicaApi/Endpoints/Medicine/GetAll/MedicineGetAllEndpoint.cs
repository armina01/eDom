using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DomZaStaraLicaApi.Endpoints.Medicine.GetAll
{
    [Route("lijek/getAll")]
    public class MedicineGetAllEndpoint:MyBaseEndpoint<NoRequest, MedicineGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public MedicineGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
       
        [HttpGet]
        public override async Task<MedicineGetAllResponse> Obradi([FromQuery] NoRequest request)
        {
            var lijek = await _applicationDbContext.Lijek
                .OrderByDescending(x => x.LijekId)
                .Select(x => new MedicineGetAllResponseLijek()
                {
                   LijekId= x.LijekId,
                   Naziv= x.Naziv,
                   Uputstvo= x.Uputstvo
                })
                .ToListAsync();

            return new MedicineGetAllResponse
            {
                Lijekovi= lijek
            };
        }
    }
}
