namespace Itinerary.Business.Places.Models
{
  public class Category
  {
    public Category( long categoryId, string name )
    {
      CategoryId = categoryId;
      Name = name;
    }

    public long CategoryId { get; }

    public string Name { get; }
  }
}
