using Itinerary.GoogleApiClient.Places;
using Itinerary.GoogleApiClient.Places.Autocomplete.Entities;
using Itinerary.GoogleApiClient.Places.Autocomplete.ParameterBuilder;
using Itinerary.GoogleApiClient.Places.Autocomplete.Types;
using Itinerary.GoogleApiClient.Places.Common.Types;
using Itinerary.GoogleApiClient.Places.Details.Entities;
using Itinerary.GoogleApiClient.Places.Details.ParameterBuilder;
using Itinerary.GoogleApiClient.Places.Search.Entities.Nearby;
using Itinerary.GoogleApiClient.Places.Search.Entities.Radar;
using Itinerary.GoogleApiClient.Places.Search.Entities.Text;
using Itinerary.GoogleApiClient.Places.Search.ParameterBuilder.Interfaces;
using Itinerary.Tests.Utilities;
using Xunit;

namespace Itinerary.Tests.Integration
{
  public class GoogleApiClientTests
  {
    [Fact]
    public async void It_should_return_nearby_search_results()
    {
      INearbyHttpQueryBuilder searchQueryBuilder =
        PlacesBuilder.Create( GoogleClientSecretsStorage.Instance.ClientSecrets )
                     .NearbySearch()
                     .Radius( 1000 )
                     .Keyword( "bank" )
                     .Location( 42.201154, -85.580002 )
                     .Language( Languages.English );

      NearbyResult results = await PlacesClient.NearbySearch( searchQueryBuilder );

      Assert.NotNull( results );
      Assert.NotEmpty( results.Results );
    }

    [Fact]
    public async void It_should_return_text_search_results()
    {
      ITextHttpQueryBuilder textQueryBuilder =
        PlacesBuilder.Create( GoogleClientSecretsStorage.Instance.ClientSecrets )
                     .TextSearch()
                     .Radius( 100 )
                     .Query( "bank" )
                     .Location( 42.201154, -85.580002 );

      TextResult results = await PlacesClient.TextSearch( textQueryBuilder );

      Assert.NotNull( results );
      Assert.NotEmpty( results.Results );
    }

    [Fact]
    public async void It_should_return_radius_search_results()
    {
      IRadarHttpQueryBuilder radarQueryBuilder =
        PlacesBuilder.Create( GoogleClientSecretsStorage.Instance.ClientSecrets )
                     .RadarSearch()
                     .Radius( 1000 )
                     .Keyword( "bank" )
                     .Location( 42.201154, -85.580002 );

      RadarResult results = await PlacesClient.RadarSearch( radarQueryBuilder );

      Assert.NotNull( results );
      Assert.NotEmpty( results.Results );
    }

    [Fact]
    public async void It_should_return_autocomlete_results()
    {
      IAutocompleteHttpQueryBuilder autocompleteQueryBuilder =
        PlacesBuilder.Create( GoogleClientSecretsStorage.Instance.ClientSecrets )
                     .Autocomplete()
                     .Radius( 1000 )
                     .Input( "kalamazoo" )
                     .Types( PlaceTypes.Cities )
                     .Location( 42.201154, -85.580002 );

      AutocompleteResult results = await PlacesClient.Autocomplete( autocompleteQueryBuilder );

      Assert.NotNull( results );
      Assert.NotEmpty( results.Predictions );
    }

    [Fact]
    public async void It_should_return_details_result()
    {
      IDetailsHttpQueryBuilder detailsHttpQueryBuilder =
        PlacesBuilder.Create( GoogleClientSecretsStorage.Instance.ClientSecrets )
                     .Details()
                     .Place( "ChIJuZIxSXmdF4gRCTBXSdL4fNo" );

      DetailsResult results = await PlacesClient.Details( detailsHttpQueryBuilder );

      Assert.NotNull( results );
      Assert.NotNull( results.Result );
      Assert.Equal( "Kalamazoo, MI, USA", results.Result.FormattedAddress );
    }
  }
}
