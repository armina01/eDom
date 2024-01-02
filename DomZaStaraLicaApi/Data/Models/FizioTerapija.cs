using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    public class FizioTerapija
    {
        public int FizioTerapijaId { get; set; }
        public string Opis { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        [ForeignKey(nameof(ZaposlenikId))]
        public Zaposlenik Zaposlenik { get; set; }
        public int KorisnikDomaID { get; set; }
        [ForeignKey(nameof(KorisnikDomaID))]
        public KorisnikDoma KorisnikDoma { get; set; }

    }
}
