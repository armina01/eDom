using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class NotifikacijaZadatak
    {
        [Key]
        public int NotifikacijaId { get; set; }
        public string Poruka { get; set; }
    }
}
