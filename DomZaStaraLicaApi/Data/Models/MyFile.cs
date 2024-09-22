﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomZaStaraLicaApi.Data.Models
{
    
    public class MyFile
    {
        [Key]
        public int FileId { get; set; }
        public string ImeFile { get; set; }
        public byte[] MojFile { get; set; }
    }
}
