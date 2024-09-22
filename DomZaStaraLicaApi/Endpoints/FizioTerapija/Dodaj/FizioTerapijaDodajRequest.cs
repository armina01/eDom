using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Endpoints.FizioTerapija.Dodaj
{
    public class FizioTerapijaDodajRequest
    {
        public string Opis { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
       
    }
}
