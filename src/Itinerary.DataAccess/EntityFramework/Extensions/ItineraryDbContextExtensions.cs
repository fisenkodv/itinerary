using System.Collections.Generic;
using System.IO;
using System.Linq;
using Itinerary.Common.Models;
using Itinerary.Common.Models.Comparers;
using Itinerary.DataAccess.Entities;
using Newtonsoft.Json;

namespace Itinerary.DataAccess.EntityFramework.Extensions
{
  public static class ItineraryDbContextExtensions
  {
    public static void EnsureSeedData( this ItineraryDbContext context )
    {
      if ( context.AllMigrationsApplied() )
      {
        string path = Path.Combine( "Data", "PlacesSnapshot.json" );
        List<PlaceDetails> placeDetails = JsonConvert
          .DeserializeObject<IEnumerable<PlaceDetails>>( File.ReadAllText( path ) )
          .Distinct( new PlaceEqualityComparer() )
          .ToList();

        if ( !context.PlaceCategories.Any() )
        {
          var categories = new List<string>();
          foreach ( PlaceDetails placeDetail in placeDetails )
            categories.AddRange( placeDetail.Categories );

          context.PlaceCategories.AddRange( categories.Distinct().Select( x => new PlaceCategory { Name = x } ) );
          context.SaveChanges();
        }
        if ( !context.Places.Any() )
        {
          Dictionary<string, PlaceCategory> createdCategories =
            context.PlaceCategories.ToDictionary( x => x.Name, x => x );

          IEnumerable<Place> places = from placeDetail in placeDetails
                                      let categories = GetPlaceCategories( createdCategories, placeDetail.Categories )
                                      let place = new Place
                                                  {
                                                    Categories = categories,
                                                    ImgUrl = placeDetail.ImgUrl,
                                                    Latitude = placeDetail.Location.Latitude,
                                                    Longitude = placeDetail.Location.Longitude,
                                                    Name = placeDetail.Name,
                                                    Rating = placeDetail.Rating,
                                                    Reviews = placeDetail.Reviews,
                                                    Url = placeDetail.Url
                                                  }
                                      select place;
          context.Places.AddRange( places );
          context.SaveChanges();
        }
      }
    }

    private static ICollection<PlacePlaceCategory> GetPlaceCategories(
      IReadOnlyDictionary<string, PlaceCategory> existingCategories,
      IEnumerable<string> categories )
    {
      return categories != null
               ? categories
                 .Select( category => existingCategories[ category ] )
                 .Select( placeCategory => new PlacePlaceCategory { Category = placeCategory } )
                 .ToList()
               : new List<PlacePlaceCategory>();
    }
  }
}
