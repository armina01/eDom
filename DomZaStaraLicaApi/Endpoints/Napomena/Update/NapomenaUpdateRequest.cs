namespace DomZaStaraLicaApi.Endpoints.Napomena.Update
{
    public class NapomenaUpdateRequest
    {
        public int NapomenaId { get; set; }
        public string Opis { get; set; }
        public bool Prioritet { get; set; }
        public bool isAktivna { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
        public int VrstaNapomeneId { get; set; }
    }
}
