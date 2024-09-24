namespace DomZaStaraLicaApi.Endpoints.Dijagnoza.Update
{
    public class DijagnozaUpdateRequest
    {
        public int dijagnozaId { get; set; }
        public string nazivBolesti { get; set; }
        public string opis { get; set; }
        public DateTime datumDijagnoze { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
        public IFormFile? File { get; set; }
    }
}
