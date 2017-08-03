using System;
using System.Globalization;
using System.Linq;
using System.Reflection;

namespace Itinerary.GoogleApiClient.Google.Attributes
{
  internal static class ArrtibutesHelper
  {
    public static CodeAttribute GetEnumCodeAttribute<T>( T language )
      where T : struct, IConvertible
    {
      MemberInfo memberInfo = typeof( T )
        .GetMember( name: language.ToString( CultureInfo.InvariantCulture ) )
        .FirstOrDefault();

      var attribute = ( CodeAttribute ) memberInfo?
        .GetCustomAttributes( attributeType: typeof( CodeAttribute ), inherit: false )
        .FirstOrDefault();

      return attribute;
    }
  }
}
