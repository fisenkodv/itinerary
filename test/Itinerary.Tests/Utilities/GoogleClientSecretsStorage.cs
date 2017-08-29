using Itinerary.GoogleApiClient;
using Itinerary.GoogleApiClient.Places;

namespace Itinerary.Tests.Utilities
{
  internal class GoogleClientSecretsStorage
  {
    private static GoogleClientSecretsStorage _instance;

    private GoogleClientSecretsStorage()
    {
      ClientSecrets =
        new GoogleClientSecrets( new[] { (PlacesBuilder.ApiName, "AIzaSyCIRow0QXhirpXJRfhn1grZ0mz0G2juHHk") } );
    }

    public static GoogleClientSecretsStorage Instance => _instance ?? ( _instance = new GoogleClientSecretsStorage() );

    public GoogleClientSecrets ClientSecrets { get; }
  }
}
