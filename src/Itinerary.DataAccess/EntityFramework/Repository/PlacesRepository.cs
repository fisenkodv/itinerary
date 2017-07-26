using System;
using System.Collections.Generic;
using Itinerary.Business.Models.Common;
using Itinerary.Business.Models.Places;
using Itinerary.Business.Places;

namespace Itinerary.DataAccess.EntityFramework.Repository
{
  public class PlacesRepository : IPlacesRepository
  {
    private readonly ItineraryDbContext _dbContext;

    public PlacesRepository( ItineraryDbContext dbContext )
    {
      _dbContext = dbContext;
    }

    public IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating )
    {
      throw new NotImplementedException();
    }
  }
}
