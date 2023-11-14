using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class Njegovatelj:Zaposlenik
    {
        public int brojPacijenata { get; set; }
        public bool isMedicinskiTehnicar { get; set; }
        public bool isNjegovatelj { get; set; }
    }
}
