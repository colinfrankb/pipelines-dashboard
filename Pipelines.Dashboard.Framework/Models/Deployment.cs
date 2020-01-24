using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Pipelines.Dashboard.Framework.Models
{
    public class Deployment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("ReleaseDefinitionName")]
        public string ReleaseDefinitionName { get; set; }

        [BsonElement("EnvironmentName")]
        public string EnvironmentName { get; set; }

        [BsonElement("CompletedOn")]
        public DateTime CompletedOn { get; set; }
    }
}