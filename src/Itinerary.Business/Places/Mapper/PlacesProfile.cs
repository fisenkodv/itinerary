using AutoMapper;
using Itinerary.Business.Places.Dto;
using Itinerary.Business.Places.Models;

namespace Itinerary.Business.Places.Mapper
{
  internal class PlacesProfile : Profile
  {
    public PlacesProfile()
    {
      CreateMap<Place, PlaceDto>().ReverseMap();
      CreateMap<Category, string>().ConvertUsing(category => category.Name);
    }
  }
}
