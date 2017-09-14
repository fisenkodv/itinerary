using System;
using System.Collections.Generic;
using Itinerary.Business;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Dto;
using Itinerary.Business.Places.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Api.Controllers
{
  [ApiVersion("1.0")]
  [Route("api/v{version:apiVersion}/[controller]")]
  public class PlacesController : Controller
  {
    private readonly IPlacesService _placesService;

    public PlacesController(IPlacesService placesService)
    {
      _placesService = placesService;
    }

    [HttpGet("[action]")]
    public IEnumerable<PlaceDto> Search(double lat, double lng, double distance, double rating)
    {
      IEnumerable<Place> places = _placesService.Search(new Location(lat, lng), distance, rating);
      return Mapper.Instance.Map<Place, PlaceDto>(places);
    }

    [HttpGet("[action]")]
    public IEnumerable<PlaceLocation> Autocomplete(string keyword)
    {
      return _placesService.Search(keyword);
    }

    [Authorize]
    [HttpGet("[action]")]
    public DateTime GetTime()
    {
      return DateTime.Now;
    }
  }
}
