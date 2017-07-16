using System;
using System.Collections.Generic;
using Itinerary.Business.Itinerary.Places;
using Itinerary.Business.Itinerary.Places.Dto;

namespace Itinerary.DataAccess.EntityFramework.Repository
{
  public class PlacesRepository : IPlacesRepository
  {
    private readonly ItineraryDbContext _dbContext;

    public PlacesRepository( ItineraryDbContext dbContext )
    {
      _dbContext = dbContext;
    }

    IEnumerable<Business.Itinerary.Places.Model.Place> IPlacesRepository.GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating,
      int reviewsCount )
    {
      //IQueryable<Place> query =
      //  _dbContext.Set<Place>()
      //            .Where(
      //              place => place.Rating >= rating &&
      //                       place.Reviews >= reviewsCount &&
      //                       place.Latitude <= northWestLocation.Latitude &&
      //                       place.Latitude >= southEastLocation.Latitude &&
      //                       place.Longitude <= southEastLocation.Longitude &&
      //                       place.Longitude >= northWestLocation.Longitude )
      //            .Include( place => place.Categories )
      //            .ThenInclude(
      //              placePlaceCategory => placePlaceCategory.Category );

      throw new NotImplementedException();
    }
  }
}
