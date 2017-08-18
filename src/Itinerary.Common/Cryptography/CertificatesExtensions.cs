using System.Security.Cryptography.X509Certificates;
using Microsoft.IdentityModel.Tokens;

namespace Itinerary.Common.Cryptography
{
  public static class CertificatesExtensions
  {
    public static readonly X509Certificate2 RootCertificate =
      new X509Certificate2(
        ResourceUtil.GetEmbeddedResourceBytes(
          typeof( CertificatesExtensions ), "Itinerary.Common.Cryptography.Certificates.ItineraryRoot.pfx" ) );

    public static readonly X509SecurityKey SigningKey = new X509SecurityKey( RootCertificate );

    public static readonly SigningCredentials SigningCredentials =
      new SigningCredentials( SigningKey, SecurityAlgorithms.RsaSha256 );
  }
}
