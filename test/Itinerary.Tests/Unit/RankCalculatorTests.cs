using System;
using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Places.Models;
using Xunit;

namespace Itinerary.Tests.Unit
{
  public class RankCalculatorTests
  {
    [Fact]
    public void It_should_return_expected_place_rank()
    {
      var places = new List<Place>
                   {
                     new Place { Rating = 2, Reviews = 500 },
                     new Place { Rating = 3, Reviews = 1000 },
                     new Place { Rating = 10, Reviews = 2 },
                     new Place { Rating = 7, Reviews = 100 }
                   };

      var maxReviews = places.Max( x => x.Reviews );
      var a = Math.Pow( maxReviews, 0.1 );

      var res1 = places.Select( x => GetPlaceRank( x, a ) ).ToList();

      var average = places.Average( x => x.Rating );
      var res2 = places.Select( x => GetPlaceRank( x, average, 100 ) ).ToList();
    }

    private double GetPlaceRank( Place place, double a )
    {
      return ( Math.Log( place.Reviews, a ) + place.Rating ) / 2;
    }

    private double GetPlaceRank( Place place, double average, int m )
    {
      return place.Reviews / ( ( double ) place.Reviews + m ) * place.Rating +
             m / ( ( double ) place.Reviews + m ) * average;
    }
  }
}
