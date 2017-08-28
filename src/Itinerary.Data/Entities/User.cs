using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Itinerary.Data.Entities
{
  public sealed class User : IdentityUser<long>
  {
    public User()
    {
      Itineraries = new List<Itinerary>();
    }

    public ICollection<Itinerary> Itineraries { get; set; }
  }
}
