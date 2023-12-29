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
            data.Add("IntervalZadatka", _dbContext.IntervalZadatka.Count());
            return Ok(data);
        }
        [HttpPost]
        public ActionResult Generisi()
        {
            var nalog = new List<Data.Models.KorisnickiNalog>();
            var vrstaZadatka=new List<Data.Models.VrstaZadatka>();
            var intervalZadatka = new List<Data.Models.IntervalZadatka>();
            nalog.Add(new Data.Models.KorisnickiNalog { 
                KorisnickoIme="Sadzida",
                Lozinka = BCrypt.Net.BCrypt.EnhancedHashPassword("Test1234", 13),
                JeDoktor=false,
                JeFizioterapeut=false,
                JeNjegovatelj=false,
                JeNutricionista=false,
                JeAdmin= true
            });
            vrstaZadatka.Add(new Data.Models.VrstaZadatka { VrstaZadatkaId=4, Naziv = "Medicinski zadatak" });
            vrstaZadatka.Add(new Data.Models.VrstaZadatka { VrstaZadatkaId = 5, Naziv = "Fizioterapeutski zadatak" });
            vrstaZadatka.Add(new Data.Models.VrstaZadatka { VrstaZadatkaId = 6, Naziv = "Opsti zadatak" });

            intervalZadatka.Add(new Data.Models.IntervalZadatka { IntervalZadatkaId = 1, JeDnevni = true, JeSedmicni = false });
            intervalZadatka.Add(new Data.Models.IntervalZadatka { IntervalZadatkaId = 2, JeSedmicni = true, JeDnevni = false });

            _dbContext.AddRange(nalog);
            _dbContext.AddRange(vrstaZadatka);
            _dbContext.AddRange(intervalZadatka);
            _dbContext.SaveChanges();

            return Count();
        }


    }
}
