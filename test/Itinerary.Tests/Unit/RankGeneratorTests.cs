using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Itinerary.Common;
using Xunit;

namespace Itinerary.Tests.Unit
{
  public class RankGeneratorTests
  {
    [Fact]
    public void It_should_return_ranks()
    {
      Stopwatch stopwatch = Stopwatch.StartNew();
      List<Rank> ranks = RankGenerator.GetRanks( 400, 3.25 ).ToList();
      stopwatch.Stop();

      long generationTime = stopwatch.ElapsedMilliseconds;

      Assert.NotEmpty( ranks );
      Assert.True( generationTime < 100, $"Elapsed time was: {generationTime}ms, but expected: 100ms" );
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
