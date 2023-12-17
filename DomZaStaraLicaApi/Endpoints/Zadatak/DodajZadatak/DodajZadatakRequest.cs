using DomZaStaraLicaApi.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Endpoints.Zadatak.DodajZaposlenika
{
    public class DodajZadatakRequest
    {

        public string Opis { get; set; }
        public bool Status { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikPostavioId { get; set; }
        public int? ZaposlenikEditovaoId { get; set; }
        public int IntervalZadatkaId { get; set; }
        public int VrstaZadatkaId { get; set; }
    }
}
