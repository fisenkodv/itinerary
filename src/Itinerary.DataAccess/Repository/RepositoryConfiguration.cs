using Itinerary.DataAccess.Repository.Interfaces;

namespace Itinerary.DataAccess.Repository
{
  public class RepositoryConfiguration: IRepositoryConfiguration
  {
    public RepositoryConfiguration(string connectionString)
    {
      ConnectionString = connectionString;
    }

    public string ConnectionString { get; }
  }
}