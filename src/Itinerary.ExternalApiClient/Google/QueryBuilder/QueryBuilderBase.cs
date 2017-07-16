using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Api.Google.Places.Search.ParameterBuilder.QueryBuilder;

namespace Itinerary.Business.Api.Google.QueryBuilder
{
  internal abstract class QueryBuilderBase : IHttpQueryBuilder
  {
    private readonly string _baseUrl;
    private readonly List<QueryParameter> _parameters;

    protected QueryBuilderBase( string baseUrl, string apiKey )
    {
      _baseUrl = baseUrl;
      _parameters = new List<QueryParameter>();

      AddParameter( ApiParameters.ApiKey, apiKey );
    }

    protected void AddParameter( string name, string value )
    {
      _parameters.Add( item: new QueryParameter( name, value, parameterWithoutValue: false ) );
    }

    protected void AddParameter( string name )
    {
      _parameters.Add( item: new QueryParameter( name, value: null, parameterWithoutValue: true ) );
    }

    private string GetParameter( string name )
    {
      return _parameters.FirstOrDefault( x => x.Name == name ).Value;
    }

    public bool IsParameterPresent( string name )
    {
      return !string.IsNullOrEmpty( value: GetParameter( name ) );
    }

    public string Build()
    {
      IEnumerable<string> parameters = from parameter in _parameters
                                       let queryParameter = parameter.ParameterWithoutValue
                                                              ? parameter.Name
                                                              : $"{parameter.Name}={parameter.Value}"
                                       select queryParameter;

      return $"{_baseUrl}{string.Join( separator: "&", values: parameters )}";
    }

    private class QueryParameter
    {
      public QueryParameter( string name, string value, bool parameterWithoutValue )
      {
        Name = name;
        Value = value;
        ParameterWithoutValue = parameterWithoutValue;
      }

      public string Name { get; }

      public string Value { get; }

      public bool ParameterWithoutValue { get; }
    }
  }
}