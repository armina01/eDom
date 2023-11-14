﻿using System.ComponentModel.DataAnnotations;

namespace DomZaStaraLicaApi.Data.Models
{
    public class KorisnickiNalog
    {
        [Key]
        public int KorisnikId { get; set; }
        public string KorisnickoIme { get; set; }
        public string Lozinka { get; set; }
        public bool JeAdmin { get; set; }
        public bool JeNjegovatelj { get; set; }
        public bool JeFizioterapeut { get; set; }
        public bool JeNutricionista { get; set; }
        public bool JeDoktor { get; set; }
    }
}
