using DomZaStaraLicaApi.Data.Models;

namespace DomZaStaraLicaApi.Endpoints.TerapijaLijek.GetAll
{
    public class TerapijaLijekGetAllResponse
    {
      public List<TerapijaLijekGetAllResponseTerapijaLijek> TerapijeLijekovi { get; set; }
    }

    public class TerapijaLijekGetAllResponseTerapijaLijek
    {
        public int TerapijaLijekId { get; set; }
        public int TerapijaId { get; set; }
        public int? LijekId { get; set; }
        public CLijek? Lijek { get; set; }
        public DomZaStaraLicaApi.Data.Models.Terapija Terapija { get; set; }


    }
}
