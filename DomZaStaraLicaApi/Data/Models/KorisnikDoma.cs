using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class KorisnikDoma 
    {
        [Key]
        public int KorisnikDomaID { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public int BrojSobe { get; set; }   
        public int OpstinaID { get; set; }
        [ForeignKey(nameof(OpstinaID))]
        public Opstina Opstina { get; set; }
        public string SlikaKorisnika { get; set; }

    }


}
