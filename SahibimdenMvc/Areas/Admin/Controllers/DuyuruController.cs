using SahibimdenMvc.Areas.Admin.Classes;
using SahibimdenMvc.DAL;
using SahibimdenMvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SahibimdenMvc.Areas.Admin.Controllers
{
    [SessionControl]
    public class DuyuruController : Controller
    {
        SahibimdenContext ctx;
        [HttpPost]
        [ValidateInput(false)]
        public bool DuyuruEkle(string message)
        {
            using (SahibimdenContext ctx = new SahibimdenContext())
            {
                bool basarili = false;
                Duyuru duyuru = new Duyuru();
                duyuru.Mesaj = message;
                duyuru.Tarih = DateTime.Now.ToString();
                ctx.Duyurular.Add(duyuru);
                if (ctx.SaveChanges() > 0)
                {
                    basarili = true;
                }

                return basarili;
            }
        }

        public JsonResult DuyuruListele(string message)
        {
            using (ctx = new SahibimdenContext())
            {
                List<Duyuru> duyurular = new List<Duyuru>();
                duyurular = ctx.Duyurular.ToList();

                return Json(duyurular, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public bool DuyuruSil(int? id)
        {
            using (SahibimdenContext ctx = new SahibimdenContext())
            {
                bool basarili = false;
                Duyuru duyuru = ctx.Duyurular.Find(id);
                ctx.Duyurular.Remove(duyuru);

                if (ctx.SaveChanges() > 0)
                {
                    basarili = true;
                }
                return basarili;
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