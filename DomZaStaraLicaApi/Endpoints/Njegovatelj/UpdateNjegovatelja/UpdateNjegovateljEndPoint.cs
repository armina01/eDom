using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Njegovatelj.UpdateNjegovatelja
{
    public class UpdateNjegovateljEndPoint : MyBaseEndpoint<UpdateNjegovateljRequest, UpdateNjegovateljResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public UpdateNjegovateljEndPoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost("updateNjegovatelja")]
        public override async Task<UpdateNjegovateljResponse> Obradi(UpdateNjegovateljRequest request)
        {
            var Njegovatelj = _applicationDbContext.Njegovatelj.FirstOrDefault(
                x => x.ZaposlenikId == request.ZaposlenikId);
            if (Njegovatelj == null) { throw new Exception("nije pronadjen korisnicki nalog za id = " + request.ZaposlenikId); }
            Njegovatelj.ImePrezime = request.ImePrezime;
            Njegovatelj.DatumRodjenja=request.DatumRodjenja;
            Njegovatelj.JMBG=request.JMBG;
            Njegovatelj.DatumZaposlenja=request.DatumZaposlenja;
            Njegovatelj.brojPacijenata = request.brojPacijenata;
            Njegovatelj.NalogId = request.NalogId;
            Njegovatelj.isMedicinskiTehnicar = request.isMedicinskiTehnicar;
            Njegovatelj.isNjegovatelj = request.isNjegovatelj;
            Njegovatelj.PoslovnaPozicijaId = request.PoslovnaPozicijaId;
            await _applicationDbContext.SaveChangesAsync();
            return new UpdateNjegovateljResponse{
                NjegovateljId=Njegovatelj.ZaposlenikId
            };

        }
    }
}
