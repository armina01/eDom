using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Njegovatelj.DeleteNjegovatlja;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.PlanIshrane.DeletePlanIshrane
{
    [Route("/deletePlanIshrane")]
    public class DeletePlanIshraneEndpoint:MyBaseEndpoint<DeletePlanIshraneRequest,NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DeletePlanIshraneEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete]
        public override async Task<NoResponse> Obradi([FromQuery] DeletePlanIshraneRequest request)
        {
            var Njegovatelj = _applicationDbContext.PlanIshrane.FirstOrDefault(
                x => x.PlanIshraneId == request.PlanIshraneId);
            if (Njegovatelj == null)
            { throw new Exception("nije pronadjen plan ishrane za id = " + request.PlanIshraneId); }
            _applicationDbContext.Remove(Njegovatelj);
            await _applicationDbContext.SaveChangesAsync();
            return new NoResponse { };
        }
    }
}

