using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Services.Places;
using Itinerary.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Controllers.Api
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
    public IEnumerable<PlaceDetails> Search( double lat, double lng, double distance, double rating )
    {
      return _placesService.Search( lat, lng, distance, rating );
    }
  }
}
