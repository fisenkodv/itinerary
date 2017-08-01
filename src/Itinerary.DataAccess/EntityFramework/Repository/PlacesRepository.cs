using System;
using System.Collections.Generic;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Models;

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
