using System;
using System.Collections.Generic;
using System.Linq;

namespace Itinerary.Common
{
  public static class RankGenerator
  {
    public static Rank GetRank( int reviewsCount, double rankValue )
    {
      return GetRanks( reviewsCount, rankValue ).OrderBy( x => x.StandardDeviation ).First();
    }

    public static IEnumerable<Rank> GetRanks( int reviewsCount, double rankValue )
    {
      bool finishSearch = false;
      int reviewCountTopRange = reviewsCount + 1;

      foreach ( int ones in Enumerable.Range( 0, reviewCountTopRange ) )
      {
        if ( finishSearch )
          yield break;

        foreach ( int twos in Enumerable.Range( 0, reviewCountTopRange - ones ) )
        {
          if ( finishSearch )
            yield break;

          foreach ( int threes in Enumerable.Range( 0, reviewCountTopRange - ones - twos ) )
          {
            foreach ( int fours in Enumerable.Range( 0, reviewCountTopRange - ones - twos - threes ) )
            {
              foreach ( int fives in Enumerable.Range( 0, reviewCountTopRange - ones - twos - threes - fours ) )
              {
                if ( ones + twos + threes + fours + fives != reviewsCount ) continue;
                var rank = new Rank( fives, fours, threes, twos, ones );
                if ( Math.Abs( rank.Average - rankValue ) < 0.001 )
                {
                  finishSearch = true;
                  yield return rank;
                }
              }
            }
          }
        }
      }
    }
  }

  public class Rank
  {
    private readonly int[] _ratings;

    public Rank( int fives, int fours, int threes, int twos, int ones )
    {
      _ratings = new[] { fives, fours, threes, twos, ones };
    }

    public int Fives => _ratings[ 0 ];

    public int Fours => _ratings[ 1 ];

    public int Threes => _ratings[ 2 ];

    public int Twos => _ratings[ 3 ];

    public int Ones => _ratings[ 4 ];

    public double Average => ( 5.0 * Fives + 4.0 * Fours + 3.0 * Threes + 2.0 * Twos + 1.0 * Ones ) / _ratings.Sum();

    public double StandardDeviation =>
      Math.Sqrt( 1.0 / ( _ratings.Length - 1 ) * _ratings.Sum( value => Math.Pow( value - Average, 2 ) ) );

    public double AverageDeviation
    {
      get
      {
        int min = _ratings.Min();
        int max = _ratings.Max();
        double avg = ( max - min ) / 2.0;

        IEnumerable<double> distances = _ratings.Select( rating => Math.Abs( rating - avg ) );
        return distances.Sum();
      }
    }

    public IEnumerable<(int value, int count)> GetRatings()
    {
      return new[]
             {
               (5, Fives),
               (4, Fours),
               (3, Threes),
               (2, Twos),
               (1, Ones)
             };
    }

    public override string ToString()
    {
      return $"5({Fives}):4({Fours}):3({Threes}):2({Twos}):1({Ones}):SD({StandardDeviation}):AD({AverageDeviation})";
    }
  }
}
