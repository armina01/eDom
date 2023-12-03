using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    
    public class Nutricionista:Zaposlenik
    {
           
        public string NutricionistickiCentar { get; set; }
        public string OblastNutricionizma { get; set; }

    }
}
