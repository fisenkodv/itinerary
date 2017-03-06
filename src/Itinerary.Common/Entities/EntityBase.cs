using System;

namespace Itinerary.Common.Entities
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