using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SahibimdenMvc.Areas.Admin.Classes
{
    public class SessionControlAttribute : ActionFilterAttribute
    {      
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                if (!HttpContext.Current.Response.IsRequestBeingRedirected)
                    filterContext.HttpContext.Response.Redirect("/Admin/Login");
            }
        }
    }
}