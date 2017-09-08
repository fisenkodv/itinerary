using System;

namespace Itinerary.Business.Identity.Dto
{
  public class JwtToken
  {
    public string Token { get; }

    public DateTime Expiration { get; }

    public JwtToken( string token, DateTime expiration )
    {
      Token = token;
      Expiration = expiration;
    }
  }
}
