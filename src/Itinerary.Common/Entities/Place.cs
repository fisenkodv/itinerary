namespace Itinerary.Common.Entities
{
  public class Place : EntityBase
  {
    public string Name { get; set; }

    public float Rating { get; set; }

    public int Reviews { get; set; }

    public Location Location { get; set; }
  }
}