using DomZaStaraLicaApi.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Endpoints.Terapija.GetAll
{
    public class TerapijaGetAllResponse
    {
       public List<TerapijaGetAllResponseTerapija> Terapije {  get; set; }
    }

    public class TerapijaGetAllResponseTerapija
    {
        public int TerapijaId { get; set; }
        public string Opis { get; set; }
        public int DoktorId { get; set; }
        public int KorisnikDomaID { get; set; }
        public string NacinPrimjene { get; set; }
        public string VremenskiInterval { get; set; }


    }
}
