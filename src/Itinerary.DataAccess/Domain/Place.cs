namespace Itinerary.DataAccess.Domain
{
  public class Place : EntityBase
  {
    public string Name { get; set; }

    public float Rating { get; set; }

    public int Reviews { get; set; }

    public string[] Categories { get; set; }

    public string Url { get; set; }

    public string ImgUrl { get; set; }

    public Location Location { get; set; }
  }
}
