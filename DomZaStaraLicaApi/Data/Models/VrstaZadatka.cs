using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class VrstaZadatka
    {
        [Key]
        public int VrstaZadatkaId { get; set; }
        public string Naziv { get; set; }
    }
}
