using DomZaStaraLicaApi.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Endpoints.Napomena.Dodaj
{
    public class NapomenaDodajRequest
    {
        public string Opis { get; set; }
        public bool Prioritet { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
        public int VrstaNapomeneId { get; set; }
        
    }
}
