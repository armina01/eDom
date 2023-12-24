using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class Terapija
    {
        public int TerapijaId { get; set; }
        public string Opis { get; set; }
        public int DoktorId { get; set; }
        [ForeignKey(nameof(DoktorId))]
        public Doktor Doktor { get; set; }
        public int KorisnikDomaID { get; set; }
        [ForeignKey(nameof(KorisnikDomaID))]
        public KorisnikDoma KorisnikDoma { get; set; }
        public string NacinPrimjene { get; set; }
        public string VremenskiInterval { get; set; }
        public List<TerapijaLijek> TerapijaLijekovi { get; set; }


    }
}
