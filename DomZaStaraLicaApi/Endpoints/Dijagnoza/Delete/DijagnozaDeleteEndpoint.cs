using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.Delete
{
    [Route("dijagnoza/obrisi")]
    public class DijagnozaDeleteEndpoint : MyBaseEndpoint<DijagnozaDeleteRequest, DijagnozaDeleteResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DijagnozaDeleteEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpDelete]
        public async override Task<DijagnozaDeleteResponse> Obradi([FromQuery]DijagnozaDeleteRequest request)
        {
            var dijagnoza= _applicationDbContext.Dijagnoza.FirstOrDefault(x=>x.dijagnozaId==request.dijagnozaId);

            if(dijagnoza==null)
            {
                throw new Exception("Dijagnoza nije pronadjena za id=" + request.dijagnozaId);
            }

            _applicationDbContext.Remove(dijagnoza);
            await _applicationDbContext.SaveChangesAsync();

            return new DijagnozaDeleteResponse
            {

            };
        }
    }
}
