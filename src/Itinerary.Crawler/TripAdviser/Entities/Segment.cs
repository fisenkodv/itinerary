using LiteDB;

namespace Itinerary.Crawler.TripAdviser.Entities
{
  public class Segment
  {
    public ObjectId Id { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public double Zoom { get; set; }

    public double Size { get; set; }

    public Map Map { get; set; }
  }
}