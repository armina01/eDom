using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
   
    public class Fizioterapeut:Zaposlenik
    {
        
        public string OblastFizijatrije { get; set; }
        public int? NalogId { get; set; }
        
    }
}
