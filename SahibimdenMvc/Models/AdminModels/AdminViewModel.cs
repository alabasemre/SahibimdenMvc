using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SahibimdenMvc.Models.AdminModels
{
    public class AdminViewModel
    {
        public LoginModel LoginModel { get; set; }
        public Araba Araba { get; set; }
        public Duyuru Duyuru { get; set; }
        public IEnumerable<Araba> MarkaModelSeri { get; set; }
    }
}