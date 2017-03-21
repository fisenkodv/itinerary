using System;

namespace Itinerary.DataAccess.Domain
{
  public interface IEntityBase<TKey>
  {
    TKey Id { get; set; }
  }

  public abstract class EntityBase : IEntityBase<Guid>
  {
    public Guid Id { get; set; }
  }
}