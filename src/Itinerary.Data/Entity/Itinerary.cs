namespace Itinerary.Data.Entity
{
  public class Itinerary : EntityBase
  {
    public string Name { get; set; }

    public User User { get; set; }
  }
}
