using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class Napomena
    {
        [Key]
        public int NapomenaId { get; set; } 
        public string Opis { get; set; }
        public bool Prioritet { get; set; }
        public bool isAktivna { get; set; } 
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        [ForeignKey(nameof(ZaposlenikId))]
        public Zaposlenik Zaposlenik { get; set; }
        public int KorisnikDomaID { get; set; }
        [ForeignKey(nameof(KorisnikDomaID))]
        public KorisnikDoma KorisnikDoma { get; set; }
        public int VrstaNapomeneId { get; set; }
        [ForeignKey(nameof(VrstaNapomeneId))]
        public VrstaNapomene VrstaNapomene { get; set; }

    }
}
