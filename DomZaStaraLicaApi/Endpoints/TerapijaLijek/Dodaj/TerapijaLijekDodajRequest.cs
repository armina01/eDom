using DomZaStaraLicaApi.Data.Models;

namespace DomZaStaraLicaApi.Endpoints.TerapijaLijek.Dodaj
{
    public class TerapijaLijekDodajRequest
    {
        public string Opis { get; set; }
        public int DoktorId { get; set; }
        public int KorisnikDomaID { get; set; }
        public string NacinPrimjene { get; set; }
        public string VremenskiInterval { get; set; }

        public List<int> Lijekovi { get; set; }


    }
}
