using System;

namespace Itinerary.GoogleApiClient.Attributes
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
