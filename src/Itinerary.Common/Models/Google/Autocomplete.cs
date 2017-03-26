namespace Itinerary.Common.Models
{
  public class Autocomplete
  {
    public Autocomplete( string placeId, string description )
    {
      PlaceId = placeId;
      Description = description;
    }

    public string PlaceId { get; }

    public string Description { get; }
  }
}
