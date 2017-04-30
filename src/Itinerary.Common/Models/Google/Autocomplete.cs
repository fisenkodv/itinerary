namespace Itinerary.Common.Models.Google
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
