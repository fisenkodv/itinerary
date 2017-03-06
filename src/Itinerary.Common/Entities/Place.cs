using System.Reflection.Metadata;

namespace Itinerary.Common.Entities
{
  public class Place : EntityBase
  {
    public string Name { get; set; }

    public Location Location { get; set; }
  }
}