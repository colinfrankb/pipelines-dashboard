using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Pipelines.Dashboard.Framework.Models
{
    public class ReleaseEnvironment
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsDeployed { get; set; }
        public bool IsInProgress { get; set; }
    }
}