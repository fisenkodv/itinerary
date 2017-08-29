using System;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;

namespace Itinerary.Data.EntityFramework.Extensions
{
  [UsedImplicitly]
  internal class PlaceSnapshotItem : IEqualityComparer<PlaceSnapshotItem>
  {
    private const double Tolerance = 0.001;

    public string Name { get; set; }

    public Dictionary<int, int> Ratings { get; set; }

    public List<string> Categories { get; set; }

    public string Url { get; set; }

    public string ImageUrl { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public int TotalReviews => Ratings.Values.Sum();

    public double AverageReview =>
      Ratings.Aggregate( 0.0, ( current, rating ) => current + rating.Key * rating.Value ) / TotalReviews;

    public bool Equals( PlaceSnapshotItem x, PlaceSnapshotItem y )
    {
      if ( ReferenceEquals( x, y ) ) return true;
      if ( ReferenceEquals( x, objB: null ) ) return false;
      if ( ReferenceEquals( y, objB: null ) ) return false;
      if ( x.GetType() != y.GetType() ) return false;
      return string.Equals( x.Name, y.Name ) &&
             x.Ratings.Values.Sum() == y.Ratings.Values.Sum() &&
             Math.Abs( y.Latitude - x.Latitude ) < Tolerance &&
             Math.Abs( x.Longitude - y.Longitude ) < Tolerance;
    }

    public int GetHashCode( PlaceSnapshotItem obj )
    {
      unchecked
      {
        int result = obj.Name.GetHashCode();

        result = ( result * 397 ) ^ obj.Url.GetHashCode();
        result = ( result * 397 ) ^ obj.Latitude.GetHashCode();
        result = ( result * 397 ) ^ obj.Longitude.GetHashCode();

        return result;
      }
    }
  }
}
