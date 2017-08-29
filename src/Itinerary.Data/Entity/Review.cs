namespace Itinerary.Data.Entity
{
  public class Review : EntityBase
  {
    public int Rating { get; set; }

    public Place Place { get; set; }

    public string Comment { get; set; }
  }
}
