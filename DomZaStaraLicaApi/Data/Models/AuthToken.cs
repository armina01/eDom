using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class AuthToken
    {
        [Key]
        public int id { get; set; }
        public string vrijednost { get; set; }
        public int KorisnickiNalogId { get; set; }
        [ForeignKey(nameof(KorisnickiNalogId))]
        public KorisnickiNalog korisnickiNalog { get; set; }
        public DateTime vrijemeEvidentiranja { get; set; }
        public string? ipAdresa { get; set; }
    }
}
