using System;
using System.Diagnostics;
using System.IO;
using System.Linq;

namespace Itinerary.DataAccess
{
  public class ResourceUtil
  {
    public static string GetEmbeddedResourceText( Type type, string name )
    {
      string resourceName = $"{type.Name}.{name}";
      using ( Stream stream = type.Assembly.GetManifestResourceStream( resourceName ) )
      {
        Trace.Assert( stream != null, $"Embedded resource not found: {resourceName}" );

        using ( TextReader reader = new StreamReader( stream ) )
        {
          return reader.ReadToEnd();
        }
      }
    }

    public static bool Exists( Type type, string name )
    {
      string resourceName = $"{type.Name}.{name}";
      return type.Assembly.GetManifestResourceNames().Contains( resourceName );
    }
  }
}
