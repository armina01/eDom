using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Dodaj;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace DomZaStaraLicaApi.Endpoints.Njegovatelj.DodajNjegovatelja
{
    public class DodajNjegovateljaEndpoint : MyBaseEndpoint<DodajNjegovateljaRequest, DodajNjegovateljaResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DodajNjegovateljaEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost("/dodajNjegovatelja")]
        public override async Task<DodajNjegovateljaResponse> Obradi([FromBody] DodajNjegovateljaRequest request)
        {
            var newObj = new Data.Models.Njegovatelj
            {
                ImePrezime = request.ImePrezime,
                JMBG = request.JMBG,
                DatumRodjenja = request.DatumRodjenja,
                DatumZaposlenja = request.DatumZaposlenja,
                brojPacijenata = request.brojPacijenata,
                PoslovnaPozicijaId= request.PoslovnaPozicijaId,
                NalogId=request.NalogId,
                isMedicinskiTehnicar=request.isMedicinskiTehnicar,
                isNjegovatelj=request.isNjegovatelj,
            };
            _applicationDbContext.Njegovatelj.Add(newObj);

            await _applicationDbContext.SaveChangesAsync();
            return new DodajNjegovateljaResponse
            {
                NjegovateljID = newObj.ZaposlenikId,
            };
            throw new NotImplementedException();
        }
    }
}
