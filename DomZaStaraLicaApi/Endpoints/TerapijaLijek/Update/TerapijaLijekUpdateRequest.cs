namespace DomZaStaraLicaApi.Endpoints.TerapijaLijek.Update
{
    public class TerapijaLijekUpdateRequest
    {
        public int TerapijaId { get; set; }
        public string Opis { get; set; }
        public int DoktorId { get; set; }
        public int KorisnikDomaID { get; set; }
        public string NacinPrimjene { get; set; }
        public string VremenskiInterval { get; set; }

        public List<int> Lijekovi { get; set; }
    }
}
