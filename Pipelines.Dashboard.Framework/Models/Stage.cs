using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Pipelines.Dashboard.Framework.Models
{
    public class Stage
    {
        public string Name { get; set; }

        public bool IsDeployed { get; set; }

        public DateTime? DateDeployed { get; set; }

        public bool CanBeSignedOff { get; set; }

        public bool IsSignedOff { get; set; }

        public DateTime? DateSignedOff { get; set; }
    }
}