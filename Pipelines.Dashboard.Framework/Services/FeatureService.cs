using Pipelines.Dashboard.Framework.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Pipelines.Dashboard.Framework.Services
{
    public class FeatureService
    {
        private readonly IMongoCollection<Feature> _features;

        public FeatureService(IDashboardDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _features = database.GetCollection<Feature>(settings.FeaturesCollectionName);
        }

        public List<Feature> Get() =>
            _features.Find(feature => true).ToList();

        public Feature Get(string id) =>
            _features.Find<Feature>(feature => feature.Id == id).FirstOrDefault();

        public Feature Create(Feature feature)
        {
          if (feature.Stages == null)
          {
            feature.Stages = new List<Stage>
            {
              new Stage
              {
                Name = "SIT"
              },
              new Stage
              {
                Name = "UAT"
              },
              new Stage
              {
                Name = "HF"
              },
              new Stage
              {
                Name = "PROD"
              }
            };
          }

          _features.InsertOne(feature);
          return feature;
        }

        public void Update(string id, Feature featureIn) => 
            _features.ReplaceOne(feature => feature.Id == id, featureIn);

        public void Delete(string id) => 
            _features.DeleteOne(feature => feature.Id == id);
    }
}