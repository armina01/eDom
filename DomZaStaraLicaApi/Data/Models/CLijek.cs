using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class CLijek
    {
        [Key]
        public int LijekId { get; set; }
        public string Naziv { get; set; }
        public string Uputstvo { get; set; }
        public List<TerapijaLijek> TerapijaLijekovi { get; set; }
    }
}


