namespace Itinerary.Common
{
  public abstract class EntityBase<TKey>
  {
    public TKey Id { get; set; }
  }
}