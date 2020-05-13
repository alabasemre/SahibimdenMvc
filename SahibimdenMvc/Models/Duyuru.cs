using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SahibimdenMvc.Models
{
    public class Duyuru
    {
        public int DuyuruId { get; set; }
        
        [Required(ErrorMessage = "Bu Alan Boş Geçilemez")]        
        public string Mesaj { get; set; }
        public string Tarih { get; set; }
    }
}