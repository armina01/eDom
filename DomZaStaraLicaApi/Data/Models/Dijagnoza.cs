using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class Dijagnoza
    {
        [Key]
        public int dijagnozaId { get; set; }
        public string nazivBolesti { get; set; }
        public string opis { get; set; }
        public DateTime datumDijagnoze { get; set; }

        public int ZaposlenikId { get; set; }
        [ForeignKey(nameof(ZaposlenikId))]
        public Zaposlenik Zaposlenik { get; set; }
        public int KorisnikDomaID { get; set; }
        [ForeignKey(nameof(KorisnikDomaID))]
        public KorisnikDoma KorisnikDoma { get; set; }
        public string? NalazFilePath { get; set; }

    }
}
