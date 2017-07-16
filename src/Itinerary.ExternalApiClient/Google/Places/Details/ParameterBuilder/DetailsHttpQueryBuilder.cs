using Itinerary.ExternalApiClient.Google.Attributes;
using Itinerary.ExternalApiClient.Google.Places.Common.Types;
using Itinerary.ExternalApiClient.Google.Places.Search.ParameterBuilder.QueryBuilder;

namespace Itinerary.ExternalApiClient.Google.Places.Details.ParameterBuilder
{
  internal class DetailsHttpQueryBuilder : SearchQueryBuilderBase, IDetailsHttpQueryBuilder
  {
    private const string BaseUrl = "https://maps.googleapis.com/maps/api/place/details/json?";

    public DetailsHttpQueryBuilder( string apiKey )
      : base( BaseUrl, apiKey )
    {
    }

    public IDetailsHttpQueryBuilder Place( string placeId )
    {
      AddParameter( ApiParameters.PlaceId, placeId );
      return this;
    }

    public IDetailsHttpQueryBuilder Reference( string reference )
    {
      AddParameter( ApiParameters.Reference, reference );
      return this;
    }

    public IDetailsHttpQueryBuilder Language( Languages language )
    {
      CodeAttribute codeAttribute = ArrtibutesHelper.GetEnumCodeAttribute( language );
      AddParameter( ApiParameters.Language, codeAttribute?.Code );
      return this;
    }
  }
}
