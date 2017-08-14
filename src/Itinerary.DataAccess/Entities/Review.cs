namespace Itinerary.DataAccess.Entities
{
  public class Review : EntityBase
  {
    public int Rating { get; set; }

    public string Comment { get; set; }
  }
}
