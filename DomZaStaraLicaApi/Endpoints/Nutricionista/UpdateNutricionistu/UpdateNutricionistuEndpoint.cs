using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Nutricionista.UpdateNutricionistu
{
    public class UpdateNutricionistuEndpoint:MyBaseEndpoint<UpdateNutricionistuRequest,UpdateNutricionistuResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public UpdateNutricionistuEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete("/izbrisiKorisnickiNalog")]
        public override async Task<UpdateNutricionistuResponse> Obradi(UpdateNutricionistuRequest request)
        {
            var Nutricionista=_applicationDbContext.Nutricionista.FirstOrDefault(
                x=>x.ZaposlenikId==request.ZaposlenikId);
            Nutricionista.DatumZaposlenja=request.DatumZaposlenja;
            Nutricionista.OblastNutricionizma = request.OblastNutricionizma;
            Nutricionista.PoslovnaPozicijaId=request.PoslovnaPozicijaId;
            Nutricionista.DatumRodjenja=request.DatumRodjenja;
            Nutricionista.JMBG=request.JMBG;
            Nutricionista.NalogId=request.NalogId;
            Nutricionista.NutricionistickiCentar = request.NutricionistickiCentar;
            await _applicationDbContext.SaveChangesAsync();
            return new UpdateNutricionistuResponse { ZaposlenikId = request.ZaposlenikId };
        }
    }
}
