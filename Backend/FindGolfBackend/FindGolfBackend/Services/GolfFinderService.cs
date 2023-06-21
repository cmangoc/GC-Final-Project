using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace FindGolfBackend.Services
{
  public interface IGolfFinderService
  {
    Task<string> FindCourses(double latitude, double longitude, double radius);
  }

  public class GolfFinderService : IGolfFinderService
  {
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public GolfFinderService(IConfiguration configuration, HttpClient httpClient)
    {
      _configuration = configuration;
      _httpClient = httpClient;
      ConfigureHttpClient();
    }

    private void ConfigureHttpClient()
    {
      string apiHost = _configuration["GolfCourseFinder:ApiHost"];
      string apiKey = _configuration["GolfCourseFinder:ApiKey"];

      _httpClient.BaseAddress = new Uri(apiHost);
      _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Key", apiKey);
      _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<string> FindCourses(double latitude, double longitude, double radius)
    {
      string apiPath = _configuration["GolfCourseFinder:ApiPath"];
      string requestUri = $"{apiPath}?radius={radius}&lat={latitude}&lng={longitude}";

      var response = await _httpClient.GetAsync(requestUri);
      response.EnsureSuccessStatusCode();

      return await response.Content.ReadAsStringAsync();
    }
  }
}
