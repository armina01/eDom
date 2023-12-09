namespace DomZaStaraLicaApi.Endpoints.Fizioterapeut.GetAll
{
    public class FizioterapeutGetAllResponse
    {
        public List<FizioterapeutGetAllResponseFizioterapeut> Fizioterapeuti { get; set; }
    }


    public class FizioterapeutGetAllResponseFizioterapeut {

        public int ZaposlenikId { get; set; }
        public string ImePrezime { get; set; }
        public string JMBG { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public DateTime DatumZaposlenja { get; set; }
        public int? NalogId { get; set; }
        public int PoslovnaPozicijaId { get; set; }
        public string OblastFizijatrije { get; set; }
    }
}
