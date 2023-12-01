namespace DomZaStaraLicaApi.Endpoints.KorisnickiNalog.GetAllKorisnickiNalog
{
    
        public class GetAllKorisnickiNalogResponse
        {
            public List<GetAllKorisnickiNalogResponseKorisnickiNalog> KorisnickiNalozi { get; set; }
        }
        public class GetAllKorisnickiNalogResponseKorisnickiNalog
        {
            
                public int NalogId { get; set; }
                public string KorisnickoIme { get; set; }
                public string Lozinka { get; set; }
                public bool JeNjegovatelj { get; set; }
                public bool JeFizioterapeut { get; set; }
                public bool JeNutricionista { get; set; }
                public bool JeDoktor { get; set; }
        }
}
