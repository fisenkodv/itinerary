namespace Itinerary.Common.Models
{
  public class Autocomplete
  {
    public Autocomplete( string id, string description )
    {
      Id = id;
      Description = description;
    }

    public string Id { get; }

    public string Description { get; }
  }
}