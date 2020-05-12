using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SahibimdenMvc.Models
{
    public class Kategori
    {
        public int KategoriId { get; set; }
        public string Ad { get; set; }
        public int UstKategori { get; set; }
    }
}