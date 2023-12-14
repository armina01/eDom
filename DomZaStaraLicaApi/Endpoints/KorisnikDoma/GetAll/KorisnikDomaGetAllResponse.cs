using System.ComponentModel.DataAnnotations.Schema;
using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;

namespace DomZaStaraLicaApi.Endpoints.KorisnikDoma.GetAll
{
    public class KorisnikDomaGetAllResponse
    {
        public List<KorisnikDomaGetAllKorisnik> Korisnici { get; set; }


    }

    public class KorisnikDomaGetAllKorisnik
    {
        public int KorisnikDomaID { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public int BrojSobe { get; set; }
        public int OpstinaID { get; set; }
        public string OpstinaNaziv { get; set; }
        public int OpstinaBroj { get; set; }
    }
}
