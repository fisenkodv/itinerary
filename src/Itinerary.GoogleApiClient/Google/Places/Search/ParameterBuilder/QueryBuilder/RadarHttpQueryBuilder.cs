using Itinerary.GoogleApiClient.Google.Places.Common.Types;
using Itinerary.GoogleApiClient.Google.Places.Search.ParameterBuilder.Interfaces;
using Itinerary.GoogleApiClient.Google.Places.Search.Types;

namespace Itinerary.GoogleApiClient.Google.Places.Search.ParameterBuilder.QueryBuilder
{
  internal class RadarHttpQueryBuilder : SearchQueryBuilderBase, IRadarHttpQueryBuilder
  {
    private const string BaseUrl = "https://maps.googleapis.com/maps/api/place/radarsearch/json?";

    public RadarHttpQueryBuilder( string apiKey )
      : base( BaseUrl, apiKey )
    {
    }

    public IRadarHttpQueryBuilder Location( double latitude, double longitude )
    {
      SetLocation( latitude, longitude );
      return this;
    }

    public IRadarHttpQueryBuilder Radius( int radius )
    {
      SetRadius( radius );
      return this;
    }

    public IRadarHttpQueryBuilder Keyword( string keyword )
    {
      SetKeyword( keyword );
      return this;
    }

    public IRadarHttpQueryBuilder Language( Languages language )
    {
      SetLanguage( language );
      return this;
    }

    public IRadarHttpQueryBuilder Price( int? minprice, int? maxprice )
    {
      SetPrice( minprice, maxprice );
      return this;
    }

    public IRadarHttpQueryBuilder Names( params string[] names )
    {
      SetNames( names );
      return this;
    }

    public IRadarHttpQueryBuilder Type( SearchTypes type )
    {
      SetType( type );
      return this;
    }
  }
}
