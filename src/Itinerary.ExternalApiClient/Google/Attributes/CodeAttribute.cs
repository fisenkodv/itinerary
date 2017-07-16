using System;

namespace Itinerary.ExternalApiClient.Google.Attributes
{
  internal class CodeAttribute : Attribute
  {
    public CodeAttribute( string code )
    {
      Code = code;
    }

    public string Code { get; }
  }
}
