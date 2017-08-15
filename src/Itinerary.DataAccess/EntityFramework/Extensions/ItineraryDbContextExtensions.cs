using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Itinerary.Common;
using Itinerary.DataAccess.Entities;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace Itinerary.DataAccess.EntityFramework.Extensions
{
  public static class ItineraryDbContextExtensions
  {
    public static void EnsureSeedData( this ItineraryDbContext context, IHostingEnvironment env )
    {
      string path = GetSnapshotFilePath( env );
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

          IEnumerable<Place> places =
            from placeDetail in placeDetails
            let categories = GetPlaceCategories( createdCategories, placeDetail.Categories )
            let reviews = GetReviews( placeDetail.Reviews, placeDetail.Rating )
            let place = new Place
                        {
                          Categories = categories,
                          Url = placeDetail.Url,
                          ImgUrl = placeDetail.ImageUrl,
                          Latitude = placeDetail.Latitude,
                          Longitude = placeDetail.Longitude,
                          Name = placeDetail.Name,
                          Rating = placeDetail.Rating,
                          Reviews = reviews
                        }
            select place;
          context.Places.AddRange( places );
          context.SaveChanges();
        }
      }
    }

    private static string GetSnapshotFilePath( IHostingEnvironment env )
    {
      string location = Assembly.GetEntryAssembly().Location;
      string directory = Path.GetDirectoryName( location );
      string path = Path.Combine( directory, "Data", $"PlacesSnapshot.{env.EnvironmentName}.json" );

      return path;
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

    private static ICollection<Review> GetReviews( int reviewsCount, double rankValue )
    {
      return Enumerable.Empty<Review>().ToList();
      IEnumerable<Review> result = from rating in RankGenerator.GetRank( reviewsCount, rankValue ).Ratings
                                   from review in Enumerable.Range( 0, rating.Value )
                                   select new Review { Rating = rating.Key };

      return result.ToList();
    }
  }
}
