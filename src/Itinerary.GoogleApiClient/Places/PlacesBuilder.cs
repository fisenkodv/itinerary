using Itinerary.GoogleApiClient.Places.Autocomplete.ParameterBuilder;
using Itinerary.GoogleApiClient.Places.Details.ParameterBuilder;
using Itinerary.GoogleApiClient.Places.Search.ParameterBuilder.Interfaces;
using Itinerary.GoogleApiClient.Places.Search.ParameterBuilder.QueryBuilder;

namespace Itinerary.GoogleApiClient.Places
{
  public class PlacesBuilder : IPlacesBuilder
  {
    public const string ApiName = "PlacesApi";

    private readonly string _apiKey;

    private PlacesBuilder(GoogleClientSecrets clientSecrets)
    {
      _apiKey = GetApiKey(clientSecrets);
    }

    public static PlacesBuilder Create(GoogleClientSecrets clientSecrets)
    {
      return new PlacesBuilder(clientSecrets);
    }

    public IAutocompleteHttpQueryBuilder Autocomplete()
    {
      return new AutocompleteHttpQueryBuilder(_apiKey);
    }

    public IDetailsHttpQueryBuilder Details()
    {
      return new DetailsHttpQueryBuilder(_apiKey);
    }

    private static string GetApiKey(GoogleClientSecrets clientSecrets)
    {
      return clientSecrets[ApiName];
    }

    public INearbyHttpQueryBuilder NearbySearch()
    {
      return new NearbyHttpQueryBuilder(_apiKey);
    }

    public ITextHttpQueryBuilder TextSearch()
    {
      return new TextHttpQueryBuilder(_apiKey);
    }

    public IRadarHttpQueryBuilder RadarSearch()
    {
      return new RadarHttpQueryBuilder(_apiKey);
    }
  }
}
