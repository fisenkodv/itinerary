using System.Collections.Generic;
using System.IO;
using System.Linq;
using Itinerary.DataAccess.Entities;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace Itinerary.DataAccess.EntityFramework.Extensions
{
  public static class ItineraryDbContextExtensions
  {
    public static void EnsureSeedData( this ItineraryDbContext context, IHostingEnvironment env )
    {
      string path = Path.Combine( "Data", $"PlacesSnapshot.{env.EnvironmentName}.json" );
      if ( File.Exists( path ) && context.AllMigrationsApplied() )
      {
        List<PlaceSnapshotItem> placeDetails = JsonConvert
          .DeserializeObject<IEnumerable<PlaceSnapshotItem>>( File.ReadAllText( path ) )
          .Distinct()
          .ToList();

        if ( !context.PlaceCategories.Any() )
        {
          var categories = new List<string>();
          foreach ( PlaceSnapshotItem placeDetail in placeDetails )
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
                                                    Url = placeDetail.Url,
                                                    ImgUrl = placeDetail.ImageUrl,
                                                    Latitude = placeDetail.Latitude,
                                                    Longitude = placeDetail.Longitude,
                                                    Name = placeDetail.Name,
                                                    Rating = placeDetail.Rating,
                                                    Reviews = placeDetail.Reviews
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
