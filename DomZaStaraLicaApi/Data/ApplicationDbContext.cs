using Microsoft.EntityFrameworkCore;
using DomZaStaraLicaApi.Data.Models;

namespace DomZaStaraLicaApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Osoba> Osoba { get; set; }
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}
