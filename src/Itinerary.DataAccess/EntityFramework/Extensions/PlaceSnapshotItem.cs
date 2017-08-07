using System.Collections.Generic;
using JetBrains.Annotations;

namespace Itinerary.DataAccess.EntityFramework.Extensions
{
  [UsedImplicitly]
  internal class PlaceSnapshotItem : IEqualityComparer<PlaceSnapshotItem>
  {
    public string Name { get; set; }

    public double Rating { get; set; }

    public int Reviews { get; set; }

    public IReadOnlyList<string> Categories { get; set; }

    public string Url { get; set; }

    public string ImageUrl { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public bool Equals( PlaceSnapshotItem x, PlaceSnapshotItem y )
    {
      if ( ReferenceEquals( x, y ) ) return true;
      if ( ReferenceEquals( x, objB: null ) ) return false;
      if ( ReferenceEquals( y, objB: null ) ) return false;
      if ( x.GetType() != y.GetType() ) return false;

      return string.Equals( x.Name, y.Name ) &&
             x.Rating == y.Rating &&
             x.Reviews == y.Reviews &&
             y.Latitude == x.Latitude &&
             x.Longitude == y.Longitude;
    }

    public int GetHashCode( PlaceSnapshotItem obj )
    {
      unchecked
      {
        int result = obj.Name.GetHashCode();
        result = ( result * 397 ) ^ obj.Rating.GetHashCode();
        result = ( result * 397 ) ^ obj.Reviews.GetHashCode();
        result = ( result * 397 ) ^ obj.Latitude.GetHashCode();
        result = ( result * 397 ) ^ obj.Longitude.GetHashCode();
        return result;
      }
    }
  }
}
