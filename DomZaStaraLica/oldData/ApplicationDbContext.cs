using Microsoft.EntityFrameworkCore;
using DomZaStaraLica.Data.Models;
namespace DomZaStaraLica.Data
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<Osoba> Osoba { get; set; }
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}
