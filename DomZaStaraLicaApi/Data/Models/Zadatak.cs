using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class Zadatak
    {
        [Key]
        public int ZadatakId { get; set; }
        public string Opis { get; set; }
        public bool Status { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikPostavioId { get; set; }
        [ForeignKey(nameof(ZaposlenikPostavioId))]
        public Zaposlenik ZaposlenikPostavio { get; set; }
        public int? ZaposlenikEditovaoId { get; set; }
        [ForeignKey(nameof(ZaposlenikEditovaoId))]
        public Zaposlenik? ZaposlenikEditovao { get; set; }
        public int IntervalZadatkaId { get; set; }
        [ForeignKey(nameof(IntervalZadatkaId))]
        public IntervalZadatka IntervalZadatka { get; set; }
        public int VrstaZadatkaId { get; set; }
        [ForeignKey(nameof(VrstaZadatkaId))]
        public VrstaZadatka VrstaZadatka { get; set; }
        public int KorisnikDomaId { get; set; }
        [ForeignKey(nameof(KorisnikDomaId))]
        public KorisnikDoma KorisnikDoma { get; set; }
    }
}
