using DomZaStaraLicaApi.Data.Models;

namespace DomZaStaraLicaApi.Endpoints.Terapija.Update
{
    public class TerapijaUpdateRequest
    {
        public int TerapijaId { get; set; }
        public string Opis { get; set; }
        public int DoktorId { get; set; }
        public int KorisnikDomaID { get; set; }
        public string NacinPrimjene { get; set; }
        public string VremenskiInterval { get; set; }
     
    }
}
