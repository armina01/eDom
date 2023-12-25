namespace DomZaStaraLicaApi.Endpoints.Napomena.GetAll
{
    public class NapomenaGetAllResponse
    {
        public List<NapomenaGetAllResponseNapomena> Napomene { get; set; }  
    }
    public class NapomenaGetAllResponseNapomena
    {
        public int NapomenaId { get; set; }
        public string Opis { get; set; }
        public bool Prioritet { get; set; }
        public DateTime DatumPostavke { get; set; }
        public int ZaposlenikId { get; set; }
        public int KorisnikDomaID { get; set; }
        public int VrstaNapomeneId { get; set; }
    }
}
