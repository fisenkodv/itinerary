using System;
using System.Collections.Generic;
using Itinerary.Business.Services.Places;
using Itinerary.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Controllers.Api
{
  [ApiVersion( "1.0" )]
  [Route( "api/v{version:apiVersion}/[controller]" )]
  public class PlacesController : Controller
  {
    private readonly IPlacesService _placesService;

    public PlacesController( IPlacesService placesService )
    {
      _placesService = placesService;
    }

    [HttpGet( "[action]" )]
    public IEnumerable<PlaceDetails> Search( double lat, double lng, double distance, double rating, int reviews )
    {
      return _placesService.Search( lat, lng, distance, rating, reviews );
    }

    [Authorize]
    [HttpGet( "[action]" )]
    public DateTime GetTime()
    {
      return DateTime.Now;
    }
  }
}
