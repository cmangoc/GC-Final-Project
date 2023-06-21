using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using FindGolfBackend.Services;

namespace FindGolfBackend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class GetCoursesController : ControllerBase
  {
    private readonly IGolfFinderService _golfFinderService;

    public GetCoursesController(IGolfFinderService golfFinderService)
    {
      _golfFinderService = golfFinderService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCourses(double latitude, double longitude, double radius)
    {
      try
      {
        string courses = await _golfFinderService.FindCourses(latitude, longitude, radius);
        return Ok(courses);
      }
      catch (Exception ex)
      {
        // Handle any exceptions that occur during the API call
        return StatusCode(500, $"An error occurred while retrieving golf courses: {ex.Message}");
      }
    }
  }
}
