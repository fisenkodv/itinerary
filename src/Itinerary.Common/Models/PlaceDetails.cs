using System;
using System.Collections.Generic;
using System.Text;

namespace Itinerary.Common.Models
{
  public class PlaceDetails
  {
    public PlaceDetails( Location location )
    {
      Location = location;
    }

    public Location Location { get; }
  }
}