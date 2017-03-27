using System.Collections.Generic;
using Itinerary.Business.Services.Places;
using Itinerary.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Controllers.Api
{
  [Route( "api/google/places" )]
  public class GooglePlacesController : Controller
  {
    private readonly IGooglePlacesService _googlePlacesService;

    public GooglePlacesController( IGooglePlacesService googlePlacesService )
    {
      _googlePlacesService = googlePlacesService;
    }

    [HttpGet( "[action]" )]
    public IEnumerable<Autocomplete> Autocomplete( string keyword )
    {
      return _googlePlacesService.Autocomplete( keyword );
    }

    [HttpGet( "[action]" )]
    public Location Location( string placeId )
    {
      return _googlePlacesService.Location( placeId );
    }
  }
}
