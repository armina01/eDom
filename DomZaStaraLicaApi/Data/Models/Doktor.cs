using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    
    public class Doktor:Zaposlenik
    {
     
        public string NazivKlinike { get; set; }
        public string OblastMedicine { get; set; }
        public string Specijalizacija { get; set; }


    }
}
