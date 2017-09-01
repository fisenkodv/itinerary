using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Itinerary.Common.Cryptography
{
  public static class CertificateExtensions
  {
    public static SymmetricSecurityKey GetSigningKey( string secretKey ) =>
      new SymmetricSecurityKey( Encoding.UTF8.GetBytes( secretKey ) );

    public static SigningCredentials GetSigningCredentials( string secretKey ) =>
      new SigningCredentials( GetSigningKey( secretKey ), SecurityAlgorithms.HmacSha256Signature );
  }
}
