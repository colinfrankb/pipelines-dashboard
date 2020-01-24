using Pipelines.Dashboard.Framework.Models;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.ReleaseManagement.WebApi;
using Microsoft.VisualStudio.Services.ReleaseManagement.WebApi.Clients;
using Microsoft.VisualStudio.Services.ReleaseManagement.WebApi.Contracts;
using Microsoft.VisualStudio.Services.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Pipelines.Dashboard.Framework.Services
{
    public class ReleaseManagementService
    {
        const string _collectionUri = "https://vsrm.dev.azure.com/epsdev";
        const string _projectName = "UPG";
        const string _pat = "keiq5tcvb53nxvzku5ian3ty4ohxqoi3hlwgmudvp2vowd5sulna";
        VssCredentials _vssCredentials;
        VssConnection _vssConnection;
        ReleaseHttpClient _releaseClient;
        ReleaseHttpClient2 _releaseClient2;
        FeatureService _featureService;

        public ReleaseManagementService(FeatureService featureService)
        {
            _vssCredentials = new VssBasicCredential(string.Empty, _pat);
            _vssConnection = new VssConnection(new Uri(_collectionUri), _vssCredentials);
            _releaseClient = _vssConnection.GetClient<ReleaseHttpClient>();
            _releaseClient2 = _vssConnection.GetClient<ReleaseHttpClient2>();
            _featureService = featureService;
        }

        public List<Models.Deployment> GetDeployments()
        {
            var deployments = _releaseClient.GetDeploymentsAsync(project: _projectName, top: 101).Result;

            return deployments.Select(x =>
              new Models.Deployment
              {
                  ReleaseDefinitionName = x.ReleaseDefinitionReference.Name,
                  EnvironmentName = x.ReleaseEnvironmentReference.Name,
                  CompletedOn = x.CompletedOn
              }
            ).ToList();
        }

        public List<Models.ReleaseDefinition> GetReleaseDefinitions()
        {
            var releaseDefinitions = _releaseClient.GetReleaseDefinitionsAsync(project: _projectName).Result;

            return releaseDefinitions.Select(x =>
                new Models.ReleaseDefinition
                {
                    Id = x.Id.ToString(),
                    Name = x.Name
                }
            ).ToList();
        }

        public List<Models.Release> GetReleases(int? releaseDefinitionId)
        {
            var releases = _releaseClient2.GetReleasesAsync(project: _projectName, top: 101, expand: ReleaseExpands.Environments | ReleaseExpands.Artifacts, definitionId: releaseDefinitionId).Result;
            var features = _featureService.Get();

            return releases.Select(x =>
              new Models.Release
              {
                  Id = x.Id.ToString(),
                  Name = x.Name,
                  ReleaseDefinition = new Models.ReleaseDefinition
                  {
                      Id = x.ReleaseDefinitionReference.Id.ToString(),
                      Name = x.ReleaseDefinitionReference.Name
                  },
                  ReleaseEnvironments = x.Environments.Select(e => new Models.ReleaseEnvironment
                  {
                      Id = e.Id.ToString(),
                      Name = e.Name,
                      IsDeployed = e.Status == EnvironmentStatus.Succeeded,
                      IsInProgress = e.Status == EnvironmentStatus.InProgress
                  }).ToList(),
                  ArtifactVersion = x.Artifacts.First(a => a.IsPrimary).DefinitionReference["version"].Name,
                  Feature = features.FirstOrDefault(f => f.Releases.Any(r => r.Id == x.Id.ToString()))
              }
            ).ToList();
        }

        public void DeployReleases(List<(string releaseId, string releaseEnvironmentId)> targetReleases)
        {
            foreach (var targetRelease in targetReleases)
            {
                DeployRelease(targetRelease.releaseId, targetRelease.releaseEnvironmentId);
            }
        }

        public void DeployRelease(string releaseId, string releaseEnvironmentId)
        {
            var releaseEnvironmentUpdateMetadata = new ReleaseEnvironmentUpdateMetadata()
            {
                Status = EnvironmentStatus.InProgress
            };

            var releaseEnvironment = _releaseClient
                .UpdateReleaseEnvironmentAsync(
                    releaseEnvironmentUpdateMetadata,
                    _projectName,
                    Convert.ToInt32(releaseId),
                    Convert.ToInt32(releaseEnvironmentId));
        }
    }
}
