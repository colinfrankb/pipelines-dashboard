using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Pipelines.Dashboard.Framework.Models;
using Pipelines.Dashboard.Framework.Services;

namespace Pipelines.Dashboard.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FeaturesController : ControllerBase
    {
        private readonly ILogger<FeaturesController> _logger;
        private readonly FeatureService _featureService;

        public FeaturesController(
          ILogger<FeaturesController> logger, 
          FeatureService featureService
        )
        {
            _logger = logger;
            _featureService = featureService;
        }

        [HttpGet]
        public IEnumerable<Feature> Get()
        {
            return _featureService.Get();
        }

        [HttpGet("{id}")]
        public Feature Get(string id)
        {
            return _featureService.Get(id);
        }

        [HttpPost]
        public Feature Create(Feature feature)
        {
            return _featureService.Create(feature);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, Feature featureIn)
        {
            var feature = _featureService.Get(id);

            if (feature == null)
            {
                return NotFound();
            }

            _featureService.Update(id, featureIn);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var feature = _featureService.Get(id);

            if (feature == null)
            {
                return NotFound();
            }

            _featureService.Delete(id);

            return NoContent();
        }
    }
}
