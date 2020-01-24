using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Pipelines.Dashboard.Framework.Models
{
    public class Feature
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string TargetProcessId { get; set; }

        public string Assigned { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public List<string> Tags { get; set; }

        public List<Stage> Stages { get; set; }

        public List<Release> Releases { get; set; }

        public bool HasReleases { get => Releases.Count > 0; }
    }
}