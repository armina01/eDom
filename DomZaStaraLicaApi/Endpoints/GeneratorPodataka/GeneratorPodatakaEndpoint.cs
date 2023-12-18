using Azure.Core;
using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.GeneratorPodataka
{
    [Route("[controller]/[action]")]
    public class GeneratorPodatakaEndpoint:ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public GeneratorPodatakaEndpoint(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public ActionResult Count()
        {
            Dictionary<string, int> data = new Dictionary<string, int>();
            data.Add("KorisnickiNalog", _dbContext.KorisnickiNalog.Count());
            data.Add("VrstaZadatka", _dbContext.VrstaZadatka.Count());
            return Ok(data);
        }
        [HttpPost]
        public ActionResult Generisi()
        {
            var nalog = new List<Data.Models.KorisnickiNalog>();
            var vrstaZadatka=new List<Data.Models.VrstaZadatka>();
            nalog.Add(new Data.Models.KorisnickiNalog { 
                KorisnickoIme="Sadzida",
                Lozinka = BCrypt.Net.BCrypt.EnhancedHashPassword("Test1234", 13),
                JeDoktor=false,
                JeFizioterapeut=false,
                JeNjegovatelj=false,
                JeNutricionista=false,
                JeAdmin= true
            });
            vrstaZadatka.Add(new Data.Models.VrstaZadatka { Naziv = "Medicinski zadatak" });
            vrstaZadatka.Add(new Data.Models.VrstaZadatka { Naziv = "Fizioterapeutski zadatak" });
            vrstaZadatka.Add(new Data.Models.VrstaZadatka { Naziv = "Opsti zadatak" });
            _dbContext.AddRange(nalog);
            _dbContext.AddRange(vrstaZadatka);
            _dbContext.SaveChanges();

            return Count();
        }


    }
}
