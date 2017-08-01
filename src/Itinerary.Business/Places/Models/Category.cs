namespace Itinerary.Business.Places.Models
{
  public class Category
  {
    public Category( string name )
    {
      Name = name;
    }

    public int CategoryId { get; set; }

    public string Name { get; set; }
  }
}
