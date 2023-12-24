using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Napomena.Update
{
    [Route("napomena/update")]
    public class NapomenaUpdateEndpoint:MyBaseEndpoint<NapomenaUpdateRequest, NapomenaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public NapomenaUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public override async Task<NapomenaUpdateResponse> Obradi(NapomenaUpdateRequest request)
        {

            var napomena = _applicationDbContext.Napomena.FirstOrDefault(x => x.NapomenaId==request.NapomenaId);

            if (napomena == null)
            {
                throw new Exception("nije pronadjena napomena za id = " + request.NapomenaId);
            }

            napomena.Opis=request.Opis;
            napomena.Prioritet=request.Prioritet;
            napomena.DatumPostavke=request.DatumPostavke;
            napomena.ZaposlenikId=request.ZaposlenikId;
            napomena.KorisnikDomaID = request.KorisnikDomaID;
            napomena.VrstaNapomeneId = request.VrstaNapomeneId;

            await _applicationDbContext.SaveChangesAsync();

            return new NapomenaUpdateResponse
            {
                NapomenaId = napomena.NapomenaId
            };

        }
    }
}
