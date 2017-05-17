using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Itinerary.DataAccess.Entities
{
  public sealed class ApplicationRole : IdentityRole<int>
  {
    public ApplicationRole()
    {
    }

    public ApplicationRole( string name )
      : this()
    {
      Name = name;
    }
  }
}
