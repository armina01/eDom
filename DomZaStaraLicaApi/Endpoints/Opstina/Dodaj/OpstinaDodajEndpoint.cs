using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Opstina.Dodaj
{
    [Microsoft.AspNetCore.Mvc.Route("opstina-dodaj")]
    public class OpstinaDodajEndpoint : MyBaseEndpoint<OpstinaDodajRequest, OpstinaDodajResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public OpstinaDodajEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<OpstinaDodajResponse> Obradi([FromBody] OpstinaDodajRequest request)
        {
            var noviObj = new Data.Models.Opstina
            {
                NazivOpstine = request.NazivOpstine,
                PostanskiBroj=request.PostanskiBroj,    
            };
            _applicationDbContext.Opstina.Add(noviObj);

            await _applicationDbContext.SaveChangesAsync();

            return new OpstinaDodajResponse
            {
                OpstinaID=noviObj.OpstinaID
            };
        }

    }
}
