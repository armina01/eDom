using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.Medicine.Update;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Terapija.Update
{
    [Route("terapija/update")]
    public class TerapijaUpdateEndpoint:MyBaseEndpoint<TerapijaUpdateRequest, TerapijaUpdateResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TerapijaUpdateEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<TerapijaUpdateResponse> Obradi(TerapijaUpdateRequest request)
        {

            var terapija = _applicationDbContext.Terapija.FirstOrDefault(x => x.TerapijaId==request.TerapijaId);

            if (terapija == null)
            {
                throw new Exception("nije pronadjena terapija za id = " + request.TerapijaId);
            }

            terapija.Opis = request.Opis;
            terapija.DoktorId= request.DoktorId;
            terapija.KorisnikDomaID = request.KorisnikDomaID;
            terapija.NacinPrimjene=request.NacinPrimjene;
            terapija.VremenskiInterval= request.VremenskiInterval;
            

            await _applicationDbContext.SaveChangesAsync();

            return new TerapijaUpdateResponse
            {
                TerapijaId= terapija.TerapijaId
            };

        }
    }
}
