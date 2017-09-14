using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Models;
using Itinerary.Data.EntityFramework;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.Data.Repository
{
  [UsedImplicitly]
  public class PlacesRepository : IPlacesRepository
  {
    private readonly ItineraryDbContext _dbContext;

    public PlacesRepository(ItineraryDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating)
    {
      IQueryable<Entity.Place> query =
        _dbContext.Set<Entity.Place>()
                  .Where(
                    place => place.Rating >= rating &&
                             place.Latitude <= northWestLocation.Latitude &&
                             place.Latitude >= southEastLocation.Latitude &&
                             place.Longitude <= southEastLocation.Longitude &&
                             place.Longitude >= northWestLocation.Longitude)
                  .Include(place => place.Categories)
                  .ThenInclude(placePlaceCategory => placePlaceCategory.Category);

      return query.Select(
        entity =>
          new Place
          {
            PlaceId = entity.Id,
            Name = entity.Name,
            Reviews = entity.Reviews.Count,
            Rating = entity.Rating,
            ImageUrl = entity.ImgUrl,
            Location = new Location(entity.Latitude, entity.Longitude),
            Categories = new List<Category>(
              entity.Categories.Select(category => new Category(category.Category.Id, category.Category.Name)))
          });
    }
  }
}
