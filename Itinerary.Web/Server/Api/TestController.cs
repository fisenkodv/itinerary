using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Server.Api
{
  [Route( "api/[controller]" )]
  public class TestController : Controller
  {
    private static string[] Names = new[]
                                    {
                                      "Mark Pieszak", "Angular mcAngular", "Redux-man", "Nintendo"
                                    };

    [HttpGet( "[action]" )]
    public IEnumerable<SampleData> Users()
    {
      var random = new Random();

      //Calling a hub function
      //_hub.Clients.All.Send("REST Working");

      return Enumerable.Range( 1, 5 ).Select(
        index => new SampleData
                 {
                   ID = random.Next( 0, 2000 ),
                   Name = Names[ random.Next( Names.Length ) ]
                 } );
    }

    public class SampleData
    {
      public int ID { get; set; }

      public string Name { get; set; }
    }
  }
}