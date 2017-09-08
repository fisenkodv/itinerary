using System;
using System.Collections.Generic;
using AutoMapper;
using Itinerary.Business.Places.Mapper;

namespace Itinerary.Business
{
  public class Mapper
  {
    private static readonly Lazy<Mapper> _instance = new Lazy<Mapper>( () => new Mapper() );
    private readonly IMapper _mapper;

    private Mapper()
    {
      var config = new MapperConfiguration(
        cfg =>
        {
          cfg.AddProfile<PlacesProfile>();
          //cfg.AddProfiles( GetType().AssemblyQualifiedName );
        } );
      _mapper = config.CreateMapper();
    }

    public static Mapper Instance => _instance.Value;

    public TDestination Map<TSource, TDestination>( TSource source )
    {
      return _mapper.Map<TSource, TDestination>( source );
    }

    public IEnumerable<TDestination> Map<TSource, TDestination>( IEnumerable<TSource> source )
    {
      return _mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>( source );
    }
  }
}
