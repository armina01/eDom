using Microsoft.EntityFrameworkCore;
using DomZaStaraLicaApi.Data.Models;

namespace DomZaStaraLicaApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<KorisnikDoma> KorisnikDoma { get; set; }
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}
