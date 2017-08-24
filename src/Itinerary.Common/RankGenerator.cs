using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
      List<Rank> ranks = new List<Rank>();
      var number = 0;


      //for ( int ones = 0; ones <= reviewsCount; ones++ )
      //{
      //  for ( int twos = 0; twos <= reviewsCount; twos++ )
      //  {
      //    for ( int threes = 0; threes <= reviewsCount; threes++ )
      //    {
      //      for ( int fours = 0; fours <= reviewsCount; fours++ )
      //      {
      //        for ( int fives = 0; fives <= reviewsCount; fives++ )
      //        {

      //        }
      //      }
      //    }
      //  }
      //}


      //for ( int fives = reviewsCount; fives >= 0; fives-- )
      //{
      //  for ( int fours = reviewsCount - fives; fours >= 0; fours-- )
      //  {
      //    for ( int threes = reviewsCount - fives - fours; threes >= 0; threes-- )
      //    {
      //      for ( int twos = reviewsCount - fives - fours - threes; twos >= 0; twos-- )
      //      {
      //        for ( int ones = reviewsCount - fives - fours - threes - twos; ones >= 0; ones-- )
      //        {
      //          if ( ones + twos + threes + fours + fives != reviewsCount )
      //          {
      //            continue;
      //          }
      //          var rank = new Rank( fives, fours, threes, twos, ones );
      //          if ( Math.Abs( rank.Average - rankValue ) < 0.001 )
      //          {
      //            ranks.Add( rank );
      //          }
      //          number++;
      //        }
      //      }
      //    }
      //  }
      //}

      return ranks;


      //bool finishSearch = false;
      //int reviewCountTopRange = reviewsCount + 1;

      //foreach ( int ones in Enumerable.Range( 0, reviewCountTopRange ).ToList() )
      //{
      //  if ( finishSearch )
      //    yield break;

      //  foreach ( int twos in Enumerable.Range( 0, reviewCountTopRange - ones ).ToList() )
      //  {
      //    if ( finishSearch )
      //      yield break;

      //    foreach ( int threes in Enumerable.Range( 0, reviewCountTopRange - ones - twos ).ToList() )
      //    {
      //      foreach ( int fours in Enumerable.Range( 0, reviewCountTopRange - ones - twos - threes ).ToList() )
      //      {
      //        foreach ( int fives in Enumerable
      //          .Range( 0, reviewCountTopRange - ones - twos - threes - fours ).ToList() )
      //        {
      //          if ( ones + twos + threes + fours + fives != reviewsCount ) continue;
      //          var rank = new Rank( fives, fours, threes, twos, ones );
      //          if ( Math.Abs( rank.Average - rankValue ) < 0.001 )
      //          {
      //            finishSearch = true;
      //            yield return rank;
      //          }
      //        }
      //      }
      //    }
      //  }
      //}
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

      public double Average => _ratings.Values.Average();

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
