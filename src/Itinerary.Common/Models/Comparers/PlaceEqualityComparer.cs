using System;
using System.Collections.Generic;

namespace Itinerary.Common.Models.Comparers
{
  public class PlaceEqualityComparer : IEqualityComparer<PlaceDetails>
  {
    public bool Equals( PlaceDetails x, PlaceDetails y )
    {
      if ( Object.ReferenceEquals( x, y ) ) return true;
      if ( Object.ReferenceEquals( x, null ) ) return false;
      if ( Object.ReferenceEquals( y, null ) ) return false;
      if ( x.GetType() != y.GetType() ) return false;

      return string.Equals( x.Name, y.Name ) &&
             x.Rating == y.Rating &&
             x.Reviews == y.Reviews &&
             x.Location.Latitude == y.Location.Latitude &&
             x.Location.Longitude == y.Location.Longitude;
    }

    public int GetHashCode( PlaceDetails obj )
    {
      unchecked
      {
        int result = obj.Name.GetHashCode();
        result = ( result * 397 ) ^ obj.Rating.GetHashCode();
        result = ( result * 397 ) ^ obj.Reviews.GetHashCode();
        result = ( result * 397 ) ^ obj.Location.Latitude.GetHashCode();
        result = ( result * 397 ) ^ obj.Location.Longitude.GetHashCode();
        return result;
      }
    }
  }
}