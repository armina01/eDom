using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class VrstaNapomene
    {
        [Key]
        public int VrstaNapomeneId { get; set; }
        public string Opis {  get; set; }
    }
}
