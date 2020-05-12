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

        // Marka 
        [SessionControl]
        public JsonResult Markalar() {
            using (ctx = new SahibimdenContext())
            {
                List<Araba> markaListe = ctx.Arabalar.Where(a => a.UstKategori == 0).ToList();
                return Json(markaListe, JsonRequestBehavior.AllowGet);
            }
        }        
      
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

        
        [SessionControl]
        public JsonResult SerilerVeMarka()
        {
            using (ctx = new SahibimdenContext())
            {
                List<Araba> markaListe = ctx.Arabalar.Where(a => a.UstKategori == 0).ToList();
                List<Araba> seriListe = ctx.Arabalar.SqlQuery("SELECT * FROM tblArabalar WHERE UstKategori != 0 OR UstKategori NOT IN(SELECT ArabaId FROM tblArabalar WHERE UstKategori != 0)").ToList();
                List<Araba> listAll = new List<Araba>();
                for (int i = 0; i < markaListe.Count; i++)
                {
                    listAll.Add(markaListe[i]);
                    for (int j = 0; j < seriListe.Count; j++)
                    {
                        if (markaListe[i].ArabaId == seriListe[j].UstKategori)
                        {
                            listAll.Add(seriListe[j]);
                        }
                    }
                }

                return Json(listAll, JsonRequestBehavior.AllowGet);
            }
        }


        [SessionControl]
        [HttpPost]
        public bool SeriEkle(Araba a)
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
        public bool SeriSil(int? id)
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
        public bool SeriGuncelle(Araba a)
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