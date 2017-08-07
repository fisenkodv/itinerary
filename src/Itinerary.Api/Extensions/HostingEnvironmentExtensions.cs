using System;
using Microsoft.AspNetCore.Hosting;

namespace Itinerary.Api.Extensions
{
  public static class HostingEnvironmentExtensions
  {
    private const string IntegrationTest = "Integration";

    public static bool IsIntegration( this IHostingEnvironment hostingEnvironment )
    {
      if ( hostingEnvironment == null )
        throw new ArgumentNullException( nameof(hostingEnvironment) );
      return hostingEnvironment.IsEnvironment( IntegrationTest );
    }
  }
}
