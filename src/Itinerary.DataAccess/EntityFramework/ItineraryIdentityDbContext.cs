using Itinerary.DataAccess.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.EntityFramework
{
  public class ItineraryIdentityDbContext : IdentityDbContext<User, Role, long>
  {
    protected ItineraryIdentityDbContext( DbContextOptions dbContextOptions )
      : base( dbContextOptions )
    {
    }
  }
}