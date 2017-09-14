using System.Collections.Generic;

namespace Itinerary.Business.Identity.Dto
{
  public class RegisterResult
  {
    public bool Succeeded { get; }

    public IEnumerable<string> Errors { get; }

    public RegisterResult(bool succeeded, IEnumerable<string> errors)
    {
      Succeeded = succeeded;
      Errors = errors;
    }
  }
}
