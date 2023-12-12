namespace DomZaStaraLicaApi.Endpoints.Nutricionista.GetAllNutricioniste
{
    public class GetAllNutricionisteResponse
    {
        public List<GetAllNutricionisteResponseNutricioniste> Nutricionisti { get; set; }
    }
    public class GetAllNutricionisteResponseNutricioniste
    {
        public int ZaposlenikId { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int? NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public string NutricionistickiCentar { get; set; }
        public string OblastNutricionizma { get; set; }
    }
}
