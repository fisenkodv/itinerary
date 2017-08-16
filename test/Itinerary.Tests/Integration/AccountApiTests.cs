using System;
using Itinerary.Business;
using Itinerary.Tests.Utilities;
using Newtonsoft.Json.Linq;
using Xunit;

namespace Itinerary.Tests.Integration
{
  public class AccountApiTests : IntegrationTestBase
  {
    [Fact]
    public async void It_should_register_new_user()
    {
      var registerBody = new
                         {
                           email = $"{Guid.NewGuid():N}@test.com",
                           password = "Welcome01!"
                         };

      ApiCallStatus apiCallStatus = await PostAsync<ApiCallStatus>( "/api/v1/account/register", registerBody );

      Assert.True( apiCallStatus.Succeeded );
      Assert.Empty( apiCallStatus.Errors );
    }

    [Fact]
    public async void It_should_return_token()
    {
      string email = $"{Guid.NewGuid():N}@test.com";
      var registerBody = new
                         {
                           email = email,
                           password = "Welcome01!"
                         };

      ApiCallStatus registerResonse = await PostAsync<ApiCallStatus>( "/api/v1/account/register", registerBody );

      Assert.True( registerResonse.Succeeded );
      Assert.Empty( registerResonse.Errors );

      var tokenBody = new
                      {
                        username = email,
                        password = "Welcome01!"
                      };

      JToken tokenResponse = await PostAsync<JToken>( "/api/v1/account/token", tokenBody );

      Assert.NotNull( tokenResponse );
      Assert.NotNull( tokenResponse[ "token" ].ToString() );
    }
  }
}
