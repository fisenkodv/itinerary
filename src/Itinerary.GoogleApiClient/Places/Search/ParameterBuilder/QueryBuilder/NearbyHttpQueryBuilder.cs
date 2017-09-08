using Itinerary.GoogleApiClient.Places.Common.Types;
using Itinerary.GoogleApiClient.Places.Search.ParameterBuilder.Interfaces;
using Itinerary.GoogleApiClient.Places.Search.Types;

namespace Itinerary.GoogleApiClient.Places.Search.ParameterBuilder.QueryBuilder
{
  internal class NearbyHttpQueryBuilder : SearchQueryBuilderBase, INearbyHttpQueryBuilder
  {
    private const string BaseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

    public NearbyHttpQueryBuilder( string apiKey )
      : base( BaseUrl, apiKey )
    {
    }

    public INearbyHttpQueryBuilder Radius( int radius )
    {
      SetRadius( radius );
      return this;
    }

    public INearbyHttpQueryBuilder Location( double latitude, double longitude )
    {
      SetLocation( latitude, longitude );
      return this;
    }

    public INearbyHttpQueryBuilder RankingBy( RankBy rankBy )
    {
      SetRankingBy( rankBy );
      return this;
    }

    public INearbyHttpQueryBuilder Keyword( string keyword )
    {
      SetKeyword( keyword );
      return this;
    }

    public INearbyHttpQueryBuilder Language( Languages language )
    {
      SetLanguage( language );
      return this;
    }

    public INearbyHttpQueryBuilder Price( int? minprice, int? maxprice )
    {
      SetPrice( minprice, maxprice );
      return this;
    }

    public INearbyHttpQueryBuilder Names( params string[] names )
    {
      SetNames( names );
      return this;
    }
  }
}
