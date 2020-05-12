using SahibimdenMvc.Areas.Admin.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SahibimdenMvc.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Admin/Home
        [SessionControl]
        public ActionResult Index()
        {
            return View();
        }
    }
}