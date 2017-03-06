using System.Collections.Generic;
using System.Linq;
using Itinerary.Common.Entities;
using Itinerary.DataAccess.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Controllers
{
  [Route( "api/[controller]" )]
  public class PlacesController : Controller
  {
    private readonly IUnitOfWork _unitOfWork;

    public PlacesController( IUnitOfWork unitOfWork )
    {
      _unitOfWork = unitOfWork;
    }

    [HttpGet( "[action]" )]
    public IEnumerable<Place> Search()
    {
      return _unitOfWork.PlacesRepository.Get( _ => true ).Take( 100 );
    }
  }
}