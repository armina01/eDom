using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class Opstina
    {
        [Key]
        public int OpstinaID { get; set; }
        public string NazivOpstine { get; set; }    
        public int PostanskiBroj { get; set; }  

    }
}
