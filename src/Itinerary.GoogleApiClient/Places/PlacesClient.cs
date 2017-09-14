using System.Threading.Tasks;
using Itinerary.GoogleApiClient.Places.Autocomplete.Entities;
using Itinerary.GoogleApiClient.Places.Autocomplete.ParameterBuilder;
using Itinerary.GoogleApiClient.Places.Details.Entities;
using Itinerary.GoogleApiClient.Places.Details.ParameterBuilder;
using Itinerary.GoogleApiClient.Places.Search.Entities.Nearby;
using Itinerary.GoogleApiClient.Places.Search.Entities.Radar;
using Itinerary.GoogleApiClient.Places.Search.Entities.Text;
using Itinerary.GoogleApiClient.Places.Search.ParameterBuilder.Interfaces;
using Itinerary.GoogleApiClient.QueryBuilder;

namespace Itinerary.GoogleApiClient.Places
{
  public class PlacesClient
  {
    public static Task<NearbyResult> NearbySearch(INearbyHttpQueryBuilder httpQueryBuilder)
    {
      return GetResponse<NearbyResult>(httpQueryBuilder);
    }

    public static Task<TextResult> TextSearch(ITextHttpQueryBuilder httpQueryBuilder)
    {
      return GetResponse<TextResult>(httpQueryBuilder);
    }

    public static Task<RadarResult> RadarSearch(IRadarHttpQueryBuilder httpQueryBuilder)
    {
      return GetResponse<RadarResult>(httpQueryBuilder);
    }

    public static Task<AutocompleteResult> Autocomplete(IAutocompleteHttpQueryBuilder httpQueryBuilder)
    {
      return GetResponse<AutocompleteResult>(httpQueryBuilder);
    }

    public static Task<DetailsResult> Details(IDetailsHttpQueryBuilder httpQueryBuilder)
    {
      return GetResponse<DetailsResult>(httpQueryBuilder);
    }

    private static Task<T> GetResponse<T>(IHttpQueryBuilder httpQueryBuilder)
    {
      var apiClient = new ApiClient();
      return apiClient.GetResponseAsync<T>(queryUrl: httpQueryBuilder.Build());
    }
  }
}
