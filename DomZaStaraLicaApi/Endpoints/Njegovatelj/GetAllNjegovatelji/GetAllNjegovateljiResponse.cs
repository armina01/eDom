namespace DomZaStaraLicaApi.Endpoints.Njegovatelj.GetAllNjegovatelji
{
    public class GetAllNjegovateljiResponse
    {
        public List<GetAllNjegovateljiResponseNjegovatelj> Njegovatelji { get; set; }
    }
    public class GetAllNjegovateljiResponseNjegovatelj
    {
        public int ZaposlenikId { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int? NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public int brojPacijenata { get; set; }
        public bool isMedicinskiTehnicar { get; set; }
        public bool isNjegovatelj { get; set; }
    }
}
