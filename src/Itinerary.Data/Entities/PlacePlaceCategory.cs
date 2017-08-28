namespace Itinerary.Data.Entities
{
  public class PlacePlaceCategory : EntityBase
  {
    public long PlaceId { get; set; }

    public long CategoryId { get; set; }

    public Place Place { get; set; }

    public PlaceCategory Category { get; set; }
  }
}
