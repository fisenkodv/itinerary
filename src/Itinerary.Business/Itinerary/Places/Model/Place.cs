using System.Collections.Generic;
using System.Linq;
using Itinerary.Common.Models;

namespace Itinerary.Business.Itinerary.Places.Model
{
  public class Place
  {
    public Place()
    {
      Categories = new List<Category>();
    }

    public string Name { get; set; }

    public double Rating
    {
      get
      {
        //TODO: Fix the alghoritm, at this point it's very stupid average number
        int maxRating = Reviews.Max( x => x.Rating );
        int rating = ( from rank in Enumerable.Range( 0, maxRating )
                       let rankReviews = Reviews.Count( x => x.Rating == rank )
                       select rank * rankReviews ).Sum();
        return rating / Reviews.Count;

      }
    }

    public List<Review> Reviews { get; set; }

    public string Url { get; set; }

    public string ImgUrl { get; set; }

    public Location Location { get; set; }

    public List<Category> Categories { get; set; }
  }
}
