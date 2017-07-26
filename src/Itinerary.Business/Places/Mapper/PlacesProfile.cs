using AutoMapper;
using Itinerary.Business.Models.Places;
using Itinerary.Business.Places.Dto;

namespace Itinerary.Business.Places.Mapper
{
  internal class PlacesProfile : Profile
  {
    public PlacesProfile()
    {
      CreateMap<Place, PlaceDto>().ReverseMap();
      CreateMap<Category, string>().ConvertUsing( category => category.Name );
    }
  }
}
