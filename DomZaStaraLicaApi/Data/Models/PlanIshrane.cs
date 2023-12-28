using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class PlanIshrane
    {
        [Key]
        public int PlanIshraneId { get; set; }
        public int FileId { get; set; }
        [ForeignKey(nameof(FileId))]
        public MyFile File { get; set; }
        public int NutricionistaId { get; set; }
        [ForeignKey(nameof(NutricionistaId))]
        public Nutricionista Nutricionista { get; set; }
        public int KorisnikDomaId { get; set; }
        [ForeignKey(nameof(KorisnikDomaId))]
        public KorisnikDoma korisnikDoma { get; set; }

    }
}
