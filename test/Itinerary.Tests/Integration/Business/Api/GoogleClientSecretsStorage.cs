using Itinerary.ExternalApiClient.Google;
using Itinerary.ExternalApiClient.Google.Places;

namespace Itinerary.Tests.Business.Api
{
  internal class GoogleClientSecretsStorage
  {
    private static GoogleClientSecretsStorage _instance;

    private GoogleClientSecretsStorage()
    {
      ClientSecrets =
        new GoogleClientSecrets( new[] { (PlacesBuilder.ApiName, "AIzaSyAGaGW1OsIQaqg_TEmHfcs9RO1lynP4f9I") } );
    }

    public static GoogleClientSecretsStorage Instance => _instance ?? ( _instance = new GoogleClientSecretsStorage() );

    public GoogleClientSecrets ClientSecrets { get; }
  }
}