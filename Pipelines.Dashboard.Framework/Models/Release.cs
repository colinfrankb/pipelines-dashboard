using System.Collections.Generic;

namespace Pipelines.Dashboard.Framework.Models
{
    public class Release
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ReleaseDefinition ReleaseDefinition { get; set; }
        public List<ReleaseEnvironment> ReleaseEnvironments { get; set; }
        public string ArtifactVersion { get; set; }
        public Feature Feature { get; set; }
        public List<GitCommit> GitCommits { get; set; }
    }
}