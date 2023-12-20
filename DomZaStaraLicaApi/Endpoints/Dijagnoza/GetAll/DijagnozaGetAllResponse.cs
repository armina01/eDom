namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.GetAll
{
    public class DijagnozaGetAllResponse
    {
        public List<DijagnozaGetAllResponseDijagnoza> Dijagnoze {  get; set; }
    }

    public class DijagnozaGetAllResponseDijagnoza
    {
        public int dijagnozaId { get; set; }
        public string nazivBolesti { get; set; }
        public string opis { get; set; }
        public DateTime datumDijagnoze { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
    }
}
