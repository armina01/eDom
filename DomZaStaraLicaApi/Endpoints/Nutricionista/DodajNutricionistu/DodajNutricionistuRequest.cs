using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Endpoints.Nutricionista.DodajNutricionistu
{
    public class DodajNutricionistuRequest
    {
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public string NutricionistickiCentar { get; set; }
        public string OblastNutricionizma { get; set; }
    }
}
