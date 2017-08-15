using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

namespace Itinerary.Common
{
  public static class RankGenerator
  {
    public static Rank GetRank( int reviewsCount, double rankValue )
    {
      return GetRanks( reviewsCount, rankValue ).ToList().OrderBy( x => x.StandardDeviation ).First();
    }

    public static IEnumerable<Rank> GetRanks( int reviewsCount, double rankValue )
    {
      int numberOfFoundRanks = 0;
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
            if ( numberOfFoundRanks > 100 )
              yield break;
            foreach ( int fours in Enumerable.Range( 0, reviewCountTopRange - ones - twos - threes ) )
            {
              if ( numberOfFoundRanks > 100 )
                yield break;
              foreach ( int fives in Enumerable.Range( 0, reviewCountTopRange - ones - twos - threes - fours ) )
              {
                if ( ones + twos + threes + fours + fives != reviewsCount ) continue;
                var rank = new Rank( fives, fours, threes, twos, ones );
                if ( Math.Abs( rank.Average - rankValue ) < 0.001 )
                {
                  finishSearch = true;
                  numberOfFoundRanks++;
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
    private readonly ReadOnlyDictionary<int, int> _ratings;

    public Rank( int fives, int fours, int threes, int twos, int ones )
    {
      _ratings = new ReadOnlyDictionary<int, int>(
        new Dictionary<int, int>
        {
          [ 5 ] = fives,
          [ 4 ] = fours,
          [ 3 ] = threes,
          [ 2 ] = twos,
          [ 1 ] = ones,
        } );
    }

    public double Average => _ratings.Aggregate( 0.0, ( sum, pair ) => sum + pair.Key * pair.Value ) /
                             _ratings.Values.Sum();

    public double StandardDeviation =>
      Math.Sqrt( 1.0 / ( _ratings.Count - 1 ) * _ratings.Values.Sum( value => Math.Pow( value - Average, 2 ) ) );

    public ReadOnlyDictionary<int, int> Ratings => _ratings;

    public int this[ int rating ] => _ratings[ rating ];

    public override string ToString()
    {
      return $"5({this[ 5 ]}):4({this[ 4 ]}):3({this[ 3 ]}):2({this[ 2 ]}):1({this[ 1 ]}):SD({StandardDeviation})";
    }
  }
}
