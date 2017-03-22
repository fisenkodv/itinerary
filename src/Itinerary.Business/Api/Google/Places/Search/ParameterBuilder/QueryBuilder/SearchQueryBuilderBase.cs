using Itinerary.Business.Api.Google.Attributes;
using Itinerary.Business.Api.Google.Places.Common.Types;
using Itinerary.Business.Api.Google.Places.Search.Types;
using Itinerary.Business.Api.Google.QueryBuilder;

namespace Itinerary.Business.Api.Google.Places.Search.ParameterBuilder.QueryBuilder
{
  internal class SearchQueryBuilderBase : QueryBuilderBase
  {
    public SearchQueryBuilderBase( string baseUrl, string apiKey ) :
      base( baseUrl, apiKey )
    {
    }

    public void SetQuery( string query )
    {
      AddParameter( ApiParameters.Query, query );
    }

    public void SetRadius( int radius )
    {
      AddParameter( ApiParameters.Radius, value: radius.ToString() );
    }

    public void SetLocation( double latitude, double longitude )
    {
      AddParameter( ApiParameters.Location, value: $"{latitude},{longitude}" );
    }

    public void SetRankingBy( RankBy rankBy )
    {
      AddParameter( ApiParameters.RankBy, value: rankBy.ToString().ToLowerInvariant() );
    }

    public void SetKeyword( string keyword )
    {
      AddParameter( ApiParameters.Keyword, keyword );
    }

    public void SetLanguage( Languages language )
    {
      CodeAttribute codeAttribute = ArrtibutesHelper.GetEnumCodeAttribute( language );
      AddParameter( ApiParameters.Language, codeAttribute?.Code );
    }

    public void SetPrice( int? minprice, int? maxprice )
    {
      if ( minprice.HasValue )
        AddParameter( ApiParameters.MinPrice, value: minprice.Value.ToString() );

      if ( maxprice.HasValue )
        AddParameter( ApiParameters.MaxnPrice, value: maxprice.Value.ToString() );
    }

    public void SetNames( params string[] names )
    {
      AddParameter( ApiParameters.Name, value: string.Join( separator: "|", value: names ) );
    }

    public void SetPageToken( string pageToken )
    {
      AddParameter( ApiParameters.PageToken, pageToken );
    }

    public void SetType( SearchTypes type )
    {
      AddParameter( ApiParameters.Type, value: type.ToString().ToLowerInvariant() );
    }
  }
}