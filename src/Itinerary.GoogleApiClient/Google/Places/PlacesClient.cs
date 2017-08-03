using System.Threading.Tasks;
using Itinerary.GoogleApiClient.Google.Places.Autocomplete.Entities;
using Itinerary.GoogleApiClient.Google.Places.Autocomplete.ParameterBuilder;
using Itinerary.GoogleApiClient.Google.Places.Details.Entities;
using Itinerary.GoogleApiClient.Google.Places.Details.ParameterBuilder;
using Itinerary.GoogleApiClient.Google.Places.Search.Entities.Nearby;
using Itinerary.GoogleApiClient.Google.Places.Search.Entities.Radar;
using Itinerary.GoogleApiClient.Google.Places.Search.Entities.Text;
using Itinerary.GoogleApiClient.Google.Places.Search.ParameterBuilder.Interfaces;
using Itinerary.GoogleApiClient.Google.QueryBuilder;

namespace Itinerary.GoogleApiClient.Google.Places
{
  public class PlacesClient
  {
    public static Task<NearbyResult> NearbySearch( INearbyHttpQueryBuilder httpQueryBuilder )
    {
      return GetResponse<NearbyResult>( httpQueryBuilder );
    }

    public static Task<TextResult> TextSearch( ITextHttpQueryBuilder httpQueryBuilder )
    {
      return GetResponse<TextResult>( httpQueryBuilder );
    }

    public static Task<RadarResult> RadarSearch( IRadarHttpQueryBuilder httpQueryBuilder )
    {
      return GetResponse<RadarResult>( httpQueryBuilder );
    }

    public static Task<AutocompleteResult> Autocomplete( IAutocompleteHttpQueryBuilder httpQueryBuilder )
    {
      return GetResponse<AutocompleteResult>( httpQueryBuilder );
    }

    public static Task<DetailsResult> Details( IDetailsHttpQueryBuilder httpQueryBuilder )
    {
      return GetResponse<DetailsResult>( httpQueryBuilder );
    }

    private static Task<T> GetResponse<T>( IHttpQueryBuilder httpQueryBuilder )
    {
      var apiClient = new ApiClient();
      return apiClient.GetResponse<T>( queryUrl: httpQueryBuilder.Build() );
    }
  }
}
