using Itinerary.DataAccess.Domain;
using Itinerary.DataAccess.Repository.Interfaces;

namespace Itinerary.Tests.Unit.Business.Services.Places
{
  internal class PlacesRepositoryFake : GuidKeyRepositoryFake<Place>, IPlacesRepository
  {
  }
}