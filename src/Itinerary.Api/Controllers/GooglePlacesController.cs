using System.Collections.Generic;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Models;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Api.Controllers
{
  [ApiVersion( "1.0" )]
  [Route( "api/v{version:apiVersion}/google/places" )]
  public class GooglePlacesController : Controller
  {
    private readonly IPlacesService _googlePlacesService;

    public GooglePlacesController( IPlacesService googlePlacesService )
    {
      _googlePlacesService = googlePlacesService;
    }

    [HttpGet( "[action]" )]
    public IEnumerable<PlaceLocation> Autocomplete( string keyword )
    {
      return _googlePlacesService.Search( keyword );
    }

    //[HttpGet( "[action]" )]
    //public Location Location( string placeId )
    //{
    //  return _googlePlacesService.Location( placeId );
    //}
  }
}
