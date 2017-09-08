using System;
using System.Diagnostics;
using System.IO;
using System.Linq;

namespace Itinerary.Common
{
  public static class ResourceUtil
  {
    public static string GetEmbeddedResourceText( Type type, string name )
    {
      return ReadEmbeddedResourceStream(
        type, name, stream =>
                    {
                      using ( TextReader reader = new StreamReader( stream ) )
                      {
                        return reader.ReadToEnd();
                      }
                    } );
    }

    public static byte[] GetEmbeddedResourceBytes( Type type, string name )
    {
      return ReadEmbeddedResourceStream(
        type, name, stream =>
                    {
                      using ( var memoryStream = new MemoryStream() )
                      {
                        stream.CopyTo( memoryStream );
                        return memoryStream.ToArray();
                      }
                    } );
    }

    public static bool Exists( Type type, string resourceName )
    {
      return type.Assembly.GetManifestResourceNames().Contains( resourceName );
    }

    private static T ReadEmbeddedResourceStream<T>( Type type, string resourceName, Func<Stream, T> reader )
    {
      using ( Stream stream = type.Assembly.GetManifestResourceStream( resourceName ) )
      {
        Trace.Assert( stream != null, $"Embedded resource not found: {resourceName}" );
        return reader( stream );
      }
    }
  }
}
