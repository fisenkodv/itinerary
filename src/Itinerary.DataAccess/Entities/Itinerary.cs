namespace Itinerary.DataAccess.Entities
{
  public class Itinerary : EntityBase
  {
    public string Name { get; set; }

    public User User { get; set; }
  }
}
