using System.Collections.Generic;
using System.Linq;
using Itinerary.Common;
using Xunit;

namespace Itinerary.Tests.Unit
{
  public class RankGeneratorTests
  {
    [Fact]
    public void It_should_return_best_rank()
    {
      List<Rank> ranks = RankGenerator.GetRanks( 2, 3.5 ).ToList();

      Assert.NotEmpty( ranks );
    }

    [Fact]
    public void It_should_return_rank_with_minimum_standard_deviation()
    {
      List<Rank> ranks = RankGenerator.GetRanks( 100, 3.5 ).ToList();
      Rank rank = RankGenerator.GetRank( 100, 3.5 );

      Assert.NotEmpty( ranks );
      Assert.Equal( rank.StandardDeviation, ranks.Min( x => x.StandardDeviation ) );
    }
  }
}
