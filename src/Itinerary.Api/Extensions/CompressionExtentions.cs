using System;
using System.IO.Compression;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Itinerary.Api.Extensions
{
  internal static class CompressionExtentions
  {
    public static IServiceCollection AddCompression(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      if ( !string.Equals(
             configuration[ "EnableCompression" ],
             bool.TrueString,
             StringComparison.CurrentCultureIgnoreCase ) ) return services;

      services.Configure<GzipCompressionProviderOptions>(
        options => options.Level = CompressionLevel.Optimal );
      services.AddResponseCompression( options => { options.Providers.Add<GzipCompressionProvider>(); } );

      return services;
    }
  }
}
