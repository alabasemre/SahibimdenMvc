using SahibimdenMvc.Areas.Admin.Classes;
using SahibimdenMvc.DAL;
using SahibimdenMvc.Models;
using SahibimdenMvc.Models.AdminModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SahibimdenMvc.Areas.Admin.Controllers
{
    public class MSMController : Controller
    {
        SahibimdenContext ctx;
        // GET: Admin/MSM
        [SessionControl]
        public ActionResult Index()
        {
            return View();
        }

        [SessionControl]
        public JsonResult Markalar() {
            using (ctx = new SahibimdenContext())
            {
                List<Araba> markaListe = ctx.Arabalar.Where(a => a.UstKategori == 0).ToList();
                return Json(markaListe, JsonRequestBehavior.AllowGet);
            }
        }

        //[HttpPost]
        //public ActionResult Ekle(AdminViewModel a)
        //{
        //    using (ctx = new SahibimdenContext())
        //    {
        //        ctx.Arabalar.Add(a.Araba);
        //        ctx.SaveChanges();
        //    }
        //    return Redirect("/Admin/Home");
        //}

        [SessionControl]
        [HttpPost]
        public bool MarkaEkle(Araba a)
        {
            bool basarili = false;
            using (ctx = new SahibimdenContext())
            {
                if (ModelState.IsValid)
                {
                    ctx.Arabalar.Add(a);
                    if (ctx.SaveChanges() > 0)
                    {
                        basarili = true;
                    }
                }                        
            }
            return basarili;
        }

        [SessionControl]
        [HttpPost]
        public bool MarkaSil(int? id)
        {
            bool basarili = false;
            using (ctx = new SahibimdenContext())
            {
                Araba a = ctx.Arabalar.Find(id);
                ctx.Arabalar.Remove(a);
                if (ctx.SaveChanges() > 0)
                {
                    basarili = true;
                }
            }
            return basarili;
        }

        [SessionControl]
        [HttpPost]
        public bool MarkaGuncelle(Araba a)
        {
            bool basarili = false;
            using (ctx = new SahibimdenContext())
            {
                ctx.Entry(a).State = EntityState.Modified;
          
                if (ctx.SaveChanges() > 0)
                {
                    basarili = true;
                }
            }
            return basarili;
        }
    }
}