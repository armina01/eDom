using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLica.Data.Models
{
    public class Osoba
    {
        [Key]
        public int osobaID { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public int JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
    }
}
