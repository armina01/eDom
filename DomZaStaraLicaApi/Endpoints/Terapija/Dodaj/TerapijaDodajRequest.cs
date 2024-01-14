using System.ComponentModel.DataAnnotations.Schema;
using DomZaStaraLicaApi.Data.Models;

namespace DomZaStaraLicaApi.Endpoints.Terapija.Dodaj
{
    public class TerapijaDodajRequest
    {
        public string Opis { get; set; }
        public int DoktorId { get; set; }
        public int KorisnikDomaID { get; set; }
        public string NacinPrimjene { get; set; }
        public string VremenskiInterval { get; set; }
        

    }
}
