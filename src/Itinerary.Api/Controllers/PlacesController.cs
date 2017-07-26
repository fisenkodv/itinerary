using System;
using System.Collections.Generic;
using Itinerary.Business.Places.Dto;
using Itinerary.Business.Places.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Api.Controllers
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
    public IEnumerable<PlaceDto> Search( double lat, double lng, double distance, double rating, int reviews )
    {
      //FIXME: Fix
      //return _placesService.Search( lat, lng, distance, rating, reviews );
      return null;
    }

    [Authorize]
    [HttpGet( "[action]" )]
    public DateTime GetTime()
    {
      return DateTime.Now;
    }
  }
}
