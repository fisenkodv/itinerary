using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Itinerary.DataAccess.Entities
{
  public sealed class Role : IdentityRole<long>
  {
    public Role()
    {
    }

    public Role( string name )
      : this()
    {
      Name = name;
    }
  }
}
