using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class TerapijaLijek
    {
        public int TerapijaLijekId { get; set; }
        public int TerapijaId { get; set; }
        public int? LijekId { get; set; }
        public CLijek? Lijek { get; set; }
        public Terapija Terapija { get; set; }
        
    }
}
