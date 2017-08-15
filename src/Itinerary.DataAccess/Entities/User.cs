using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Itinerary.DataAccess.Entities
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
