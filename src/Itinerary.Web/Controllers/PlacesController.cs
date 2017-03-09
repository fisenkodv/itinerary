using System.Collections.Generic;
using Itinerary.Business.Places;
using Itinerary.Common.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Controllers
{
  [Route( "api/[controller]" )]
  public class PlacesController : Controller
  {
    private readonly IPlacesService _placesService;

    public PlacesController( IPlacesService placesService )
    {
      _placesService = placesService;
    }

    [HttpGet( "[action]" )]
    public IEnumerable<Place> Search( double lat, double lng, double radius, double rating )
    {
      return _placesService.Search( lat, lng, radius, rating );
    }
  }
}