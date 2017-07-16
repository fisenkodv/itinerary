using Itinerary.ExternalApiClient.Google.Places.Common.Types;
using Itinerary.ExternalApiClient.Google.Places.Search.ParameterBuilder.Interfaces;
using Itinerary.ExternalApiClient.Google.Places.Search.Types;

namespace Itinerary.ExternalApiClient.Google.Places.Search.ParameterBuilder.QueryBuilder
{
  internal class TextHttpQueryBuilder : SearchQueryBuilderBase, ITextHttpQueryBuilder
  {
    private const string BaseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?";

    public TextHttpQueryBuilder( string apiKey )
      : base( BaseUrl, apiKey )
    {
    }

    public ITextHttpQueryBuilder Query( string query )
    {
      SetQuery( query );
      return this;
    }

    public ITextHttpQueryBuilder Location( double latitude, double longitude )
    {
      SetLocation( latitude, longitude );
      return this;
    }

    public ITextHttpQueryBuilder Radius( int radius )
    {
      SetRadius( radius );
      return this;
    }

    public ITextHttpQueryBuilder Language( Languages language )
    {
      SetLanguage( language );
      return this;
    }

    public ITextHttpQueryBuilder Price( int? minprice, int? maxprice )
    {
      SetPrice( minprice, maxprice );
      return this;
    }

    public ITextHttpQueryBuilder PageToken( string pageToken )
    {
      SetPageToken( pageToken );
      return this;
    }

    public ITextHttpQueryBuilder Type( SearchTypes type )
    {
      SetType( type );
      return this;
    }
  }
}
