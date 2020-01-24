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
    public class ReleaseManagementController : ControllerBase
    {
        private readonly ILogger<ReleaseManagementController> _logger;
        private readonly ReleaseManagementService _releaseManagementService;

        public ReleaseManagementController(
          ILogger<ReleaseManagementController> logger, 
          ReleaseManagementService releaseManagementService
        )
        {
            _logger = logger;
            _releaseManagementService = releaseManagementService;
        }

        [HttpGet("releasedefinitions")]
        public IEnumerable<ReleaseDefinition> ReleaseDefinitions()
        {
            return _releaseManagementService.GetReleaseDefinitions();
        }

        [HttpGet("releases")]
        public IEnumerable<Release> Releases(int? releaseDefinitionId)
        {
            return _releaseManagementService.GetReleases(releaseDefinitionId);
        }

        [HttpPost("deployselectedreleases")]
        public void DeploySelectedReleases(string[] releaseEnvironments)
        {
            var targetReleases = new List<(string, string)>();

            foreach (var releaseEnvironment in releaseEnvironments)
            {
                var releaseEnvironmentSplit = releaseEnvironment.Split(',');

                targetReleases.Add((releaseEnvironmentSplit[0], releaseEnvironmentSplit[1]));
            }

            _releaseManagementService.DeployReleases(targetReleases);
        }

        [HttpGet("deployments")]
        public IEnumerable<Deployment> Deployments()
        {
          return _releaseManagementService.GetDeployments();
        }
    }
}
