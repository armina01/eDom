using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    [Table("MyFiles")]
    public class MyFile
    {
        [Key]
        public int FileId { get; set; }
        public byte[] MojFile { get; set; }
    }
}
