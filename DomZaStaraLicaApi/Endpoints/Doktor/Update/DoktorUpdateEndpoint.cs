using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Doktor.Update
{
    [Route("doktor-update")]
    public class DoktorUpdateEndpoint:MyBaseEndpoint<DoktorUpdateRequest, DoktorUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DoktorUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        public override async Task<DoktorUpdateResponse> Obradi(DoktorUpdateRequest request)
        {

            var doktor = _applicationDbContext.Doktor.FirstOrDefault(x => x.ZaposlenikId == request.ZaposlenikId);

            if (doktor == null)
            {
                throw new Exception("nije pronadjen doktor za id = " + request.ZaposlenikId);
            }

            doktor.ImePrezime= request.ImePrezime;
            doktor.JMBG=request.JMBG;
            doktor.DatumZaposlenja= request.DatumZaposlenja;
            doktor.DatumRodjenja= request.DatumRodjenja;
            doktor.NalogId= request.NalogId;
            doktor.PoslovnaPozicijaId=request.PoslovnaPozicijaId;
            doktor.NazivKlinike= request.NazivKlinike;
            doktor.OblastMedicine= request.OblastMedicine;
            doktor.Specijalizacija= request.Specijalizacija;

            await _applicationDbContext.SaveChangesAsync();

            return new DoktorUpdateResponse
            {
                ZaposlenikId = doktor.ZaposlenikId
            };

        }
    }
}
