using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using Itinerary.Business.Places;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Common;
using Itinerary.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace Itinerary.Data.EntityFramework.Extensions
{
  public static class ItineraryDbContextExtensions
  {
    public static void EnsureSeedData( this ItineraryDbContext context, IHostingEnvironment env )
    {
      string snapshotData = GetSnaphotData( env.EnvironmentName );
      if ( !string.IsNullOrEmpty( snapshotData ) && context.AllMigrationsApplied() )
      {
        Dictionary<string, PlaceSnapshotItem> placeDetails = JsonConvert
          .DeserializeObject<IEnumerable<PlaceSnapshotItem>>( snapshotData )
          .Distinct( new PlaceSnapshotItem() )
          .ToDictionary( x => x.Name, x => x );

        if ( !context.PlaceCategories.Any() )
        {
          var categories = new List<string>();
          foreach ( PlaceSnapshotItem placeDetail in placeDetails.Values )
            categories.AddRange( placeDetail.Categories );

          context.PlaceCategories.AddRange( categories.Distinct().Select( x => new PlaceCategory { Name = x } ) );
          context.SaveChanges();
        }

        if ( !context.Places.Any() )
        {
          Dictionary<string, PlaceCategory> createdCategories =
            context.PlaceCategories.ToDictionary( x => x.Name, x => x );

          double allPlacesReviewsAverage = placeDetails.Values.Average( x => x.AverageReview );

          IEnumerable<Place> places =
            from placeDetail in placeDetails.Values
            let categories = GetPlaceCategories( createdCategories, placeDetail.Categories )
            //let reviews = GetReviews( placeDetail )
            let place = new Place
                        {
                          Categories = categories,
                          Url = placeDetail.Url,
                          ImgUrl = placeDetail.ImageUrl,
                          Latitude = placeDetail.Latitude,
                          Longitude = placeDetail.Longitude,
                          Name = placeDetail.Name,
                          Rating = GetRating( placeDetail, allPlacesReviewsAverage ),
                          //Reviews = reviews
                        }
            select place;
          context.Places.AddRange( places );
          context.SaveChanges();

          ICollection<Review> reviews = context
            .Places
            .ToList()
            .SelectMany( savedPlace => GetReviews( placeDetails[ savedPlace.Name ], savedPlace ) )
            .ToList();

          context.Reviews.AddRange( reviews );
          context.SaveChanges();
        }
      }
    }

    private static string GetSnaphotData( string environmentName )
    {
      const string name = "Itinerary.Data.Data.PlacesSnapshots.zip";
      Type type = typeof( ItineraryDbContextExtensions );
      if ( ResourceUtil.Exists( type, name ) )
      {
        using ( var archive =
          new ZipArchive( new MemoryStream( ResourceUtil.GetEmbeddedResourceBytes( type, name ) ) ) )
        {
          ZipArchiveEntry entry = archive.GetEntry( $"PlacesSnapshot.{environmentName}.json" );
          if ( entry != null )
          {
            using ( TextReader reader = new StreamReader( entry.Open() ) )
            {
              return reader.ReadToEnd();
            }
          }
        }
      }

      return null;
    }

    private static ICollection<PlacePlaceCategory> GetPlaceCategories(
      IReadOnlyDictionary<string, PlaceCategory> existingCategories,
      IEnumerable<string> categories )
    {
      return categories?
               .Select( category => existingCategories[ category ] )
               .Select( placeCategory => new PlacePlaceCategory { Category = placeCategory } )
               .ToList() ?? new List<PlacePlaceCategory>();
    }

    private static ICollection<Review> GetReviews( PlaceSnapshotItem place, Place savedPlace )
    {
      return place
        .Ratings
        .SelectMany(
          x => Enumerable.Range( 0, x.Value ).Select( _ => new Review { Rating = x.Key, Place = savedPlace } ) )
        .ToList();
    }

    private static double GetRating( PlaceSnapshotItem place, double allPlacesReviewsAverage )
    {
      IRatingCalculator calculator = new DefaultRatingCalculator( allPlacesReviewsAverage );
      return calculator.GetRating( place.AverageReview, place.TotalReviews );
    }
  }
}
