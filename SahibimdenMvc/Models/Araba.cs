using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SahibimdenMvc.Models
{
    public class Araba
    {
        public int ArabaId { get; set; }
        [Required(ErrorMessage = "Bu Alan Boş Geçilemez")]
        public string Ad { get; set; }
        public int UstKategori { get; set; }
    }
}