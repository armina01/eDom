using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class IntervalZadatka
    {
        [Key]
        public int IntervalZadatkaId { get; set; }
        public bool JeDnevni { get; set; }
        public bool JeSedmicni{ get; set; }
    }
}
