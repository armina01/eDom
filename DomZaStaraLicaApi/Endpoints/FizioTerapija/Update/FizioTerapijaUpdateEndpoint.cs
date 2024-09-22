using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.FizioTerapija.Update
{
    [Route("fizioTerapija/update")]
    public class FizioTerapijaUpdateEndpoint:MyBaseEndpoint<FizioTerapijaUpdateRequest, FizioTerapijaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public FizioTerapijaUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<FizioTerapijaUpdateResponse> Obradi(FizioTerapijaUpdateRequest request)
        {
            var terapija = _applicationDbContext.FizioTerapija.FirstOrDefault(x => x.FizioTerapijaId == request.FizioTerapijaId);
            if (terapija == null)
            {
                throw new Exception("Nije pronadjena terapija za id= " + request.FizioTerapijaId);
            }
            terapija.Opis=request.Opis;
            terapija.DatumPostavke=request.DatumPostavke;
            terapija.ZaposlenikId=request.ZaposlenikId;
            terapija.KorisnikDomaID=request.KorisnikDomaID;

            await _applicationDbContext.SaveChangesAsync();

            return new FizioTerapijaUpdateResponse()
            {
                FizioTerapijaId=terapija.FizioTerapijaId,
            };
        }
    }
}
