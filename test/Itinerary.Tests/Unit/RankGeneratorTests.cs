using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using FluentAssertions;
using Itinerary.Common;
using Newtonsoft.Json;
using Xunit;

namespace Itinerary.Tests.Unit
{
  public class RankGeneratorTests
  {
    [Fact]
    public void Transform()
    {
      string fileName =
        @"C:\Users\fisenkodv\Desktop\Projects\itinerary\src\Itinerary.DataAccess\Data\PlacesSnapshot.Production.json";

      var places = JsonConvert.DeserializeObject<List<PlaceSnapshotItem>>( File.ReadAllText( fileName ) );

      var reviews =
        places.Select( x => new Pair { rating = x.Rating, reviews = x.Reviews } ).Distinct( new Pair() )
              .ToLookup( x => x.rating ).ToList();

      var results = new ConcurrentBag<(Pair pair, List<Rank> ranks)>();
      reviews.AsParallel().ForAll(
        x =>
        {
          x.AsParallel().ForAll(
            rating =>
            {
              File.WriteAllText( $"{rating.reviews}_{x.Key}.json", JsonConvert.SerializeObject( RankGenerator.GetRanks( rating.reviews, x.Key ).ToList() ) );
             
            } );
        } );

      File.WriteAllText( "out.json", JsonConvert.SerializeObject( results ) );
    }

    public class Pair : IEqualityComparer<Pair>
    {
      public int reviews { get; set; }

      public double rating { get; set; }

      public bool Equals( Pair x, Pair y )
      {
        return x.rating == y.rating && x.reviews == y.reviews;
      }

      public int GetHashCode( Pair obj )
      {
        unchecked
        {
          int result = obj.reviews.GetHashCode();
          result = ( result * 397 ) ^ obj.rating.GetHashCode();
          return result;
        }
      }
    }

    [Fact]
    public void It_should_return_ranks()
    {
      Stopwatch stopwatch = Stopwatch.StartNew();
      List<Rank> ranks = RankGenerator.GetRanks( 1000, 3.25 ).ToList();
      stopwatch.Stop();

      long generationTime = stopwatch.ElapsedMilliseconds;

      ranks.Should().NotBeNullOrEmpty();
      generationTime.Should().BeLessOrEqualTo( 100, $"Elapsed time was: {generationTime}ms, but expected: 100ms" );
    }

    [Fact]
    public void It_should_return_rank_with_minimum_standard_deviation()
    {
      List<Rank> ranks = RankGenerator.GetRanks( 100, 3.5 ).ToList();
      Rank rank = RankGenerator.GetRank( 100, 3.5 );

      ranks.Should().NotBeNullOrEmpty();
      rank.StandardDeviation.Should().Be( ranks.Min( x => x.StandardDeviation ) );
    }
  }

  internal class PlaceSnapshotItem
  {
    public string Name { get; set; }

    public double Rating { get; set; }

    public int Reviews { get; set; }

    public IReadOnlyList<string> Categories { get; set; }

    public string Url { get; set; }

    public string ImageUrl { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }
  }

  internal class PlaceSnapshotItemUpdated
  {
    public string Name { get; set; }

    public double Rating { get; set; }

    public List<Review> Reviews { get; set; }

    public List<string> Categories { get; set; }

    public string Url { get; set; }

    public string ImageUrl { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }
  }

  public class Review
  {
    public int Rating { get; set; }
  }
}
