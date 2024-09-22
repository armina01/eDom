using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Endpoints.KorisnikDoma.Obrisi;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.FileEndpoint.DodajFile
{
    public class DeleteFileRequest
    {
        public int FileId { get; set; }
    }
}
