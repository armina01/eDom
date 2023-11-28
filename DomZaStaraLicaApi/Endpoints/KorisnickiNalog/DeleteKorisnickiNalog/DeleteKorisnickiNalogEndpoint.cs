using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.Reflection.Metadata.Ecma335;
using System.Threading;

namespace DomZaStaraLicaApi.Endpoints.KorisnickiNalog.DeleteKorisnickiNalog
{
    public class DeleteKorisnickiNalogEndpoint : MyBaseEndpoint<DeleteKorisnickiNalogRequest, DeleteKorisnickiNalogResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public DeleteKorisnickiNalogEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpDelete("/izbrisiKorisnickiNalog/{KorisnikId}")]
        public override async Task<DeleteKorisnickiNalogResponse> Obradi(DeleteKorisnickiNalogRequest request)
        {
            var nalog = _applicationDbContext.KorisnickiNalog.FirstOrDefault(
               x => x.NalogId == request.NalogId);
            if (nalog == null)
            { throw new Exception("nije pronadjen korisnicki nalog za id = " + request.NalogId); }
            _applicationDbContext.Remove(nalog);
            await _applicationDbContext.SaveChangesAsync();
            return new DeleteKorisnickiNalogResponse ();
        }
    }
}
