using Microsoft.AspNetCore.Identity;

namespace Itinerary.Data.Entities
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
