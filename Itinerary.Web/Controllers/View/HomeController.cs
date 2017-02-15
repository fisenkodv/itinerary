using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Controllers.View
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }

    public IActionResult Error()
    {
      return View();
    }
  }
}
