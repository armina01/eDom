using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.UpdateZaposlenik
{
    [Route("/updateZadatak")]
    public class UpdateZadatakEndpoint : MyBaseEndpoint<UpdateZadatakRequest
        , UpdateZadatakResponse>
    {
        ApplicationDbContext _applicationDbContext;
        UpdateZadatakEndpoint(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public async override Task<UpdateZadatakResponse> Obradi(UpdateZadatakRequest request)
        {
            var zadatak = _applicationDbContext.Zadatak.FirstOrDefault(
                x=>x.ZadatakId==request.ZadatakId);
            if (zadatak != null)
            {
                zadatak.Opis=request.Opis;
                zadatak.Status=request.Status;
                zadatak.DatumPostavke=request.DatumPostavke;
                zadatak.ZaposlenikPostavioId = request.ZaposlenikPostavioId;
                zadatak.ZaposlenikEditovaoId = request.ZaposlenikEditovaoId;
                zadatak.VrstaZadatkaId = request.VrstaZadatkaId;
                zadatak.IntervalZadatkaId = request.IntervalZadatkaId;
                await _applicationDbContext.SaveChangesAsync();
                return new UpdateZadatakResponse
                {
                    ZadatakId = zadatak.ZadatakId
                };
            }
            else {
                throw new Exception("nije pronadjen zadatak za id = " + request.ZadatakId);
            }
        }
    }
}
