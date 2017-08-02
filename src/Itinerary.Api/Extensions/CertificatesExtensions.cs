using System.IO;
using System.Security.Cryptography.X509Certificates;
using Microsoft.IdentityModel.Tokens;

namespace Itinerary.Api.Extensions
{
  public static class CertificatesExtensions
  {
    public static readonly X509Certificate2 RootCertificate = new X509Certificate2(
      Path.Combine( "Certificates", "ItineraryRoot.pfx" ) );

    public static readonly X509SecurityKey SigningKey = new X509SecurityKey( RootCertificate );
  }
}
