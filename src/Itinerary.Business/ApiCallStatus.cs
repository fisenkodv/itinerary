using System.Collections.Generic;

namespace Itinerary.Business
{
  public class ApiCallStatus
  {
    public ApiCallStatus( bool succeeded, IEnumerable<string> errors )
    {
      Succeeded = succeeded;
      Errors = errors;
    }

    public bool Succeeded { get; }

    public IEnumerable<string> Errors { get; }
  }
}
