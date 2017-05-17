using Itinerary.DataAccess.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.EntityFramework
{
  public class CustomIdentityDbContext : IdentityDbContext<User, Role, long>
  {
    public CustomIdentityDbContext( DbContextOptions dbContextOptions )
      : base( dbContextOptions )
    {
    }
  }
}