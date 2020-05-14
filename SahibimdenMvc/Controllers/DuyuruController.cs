using SahibimdenMvc.DAL;
using SahibimdenMvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SahibimdenMvc.Controllers
{
    public class DuyuruController : Controller
    {
        SahibimdenContext ctx;
        // GET: Duyuru
        public ActionResult Index()
        {
            using (ctx = new SahibimdenContext())
            {
                List<Duyuru> duyurular = new List<Duyuru>();
                duyurular = ctx.Duyurular.OrderByDescending(d => d.DuyuruId ).ToList();

                return View(duyurular);
            }          
        }

        [HttpPost]
        public string DuyuruGoruntule(int? id)
        {
            using (SahibimdenContext ctx = new SahibimdenContext())
            {
                Duyuru duyuru = ctx.Duyurular.Find(id);
                return duyuru.Mesaj;
            }
        }
    }
}