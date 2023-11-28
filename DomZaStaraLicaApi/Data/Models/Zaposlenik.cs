using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class Zaposlenik
    {
        [Key]
        public int ZaposlenikId { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int? NalogId { get; set; }
        [ForeignKey(nameof(NalogId))]
        public KorisnickiNalog KorisnickiNalog { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        [ForeignKey(nameof(PoslovnaPozicijaId))]
        public PoslovnaPozicija PoslovnaPozicija { get; set; }
    }
}
