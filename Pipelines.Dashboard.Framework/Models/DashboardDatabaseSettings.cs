namespace Pipelines.Dashboard.Framework.Models
{
    public class DashboardDatabaseSettings : IDashboardDatabaseSettings
    {
        public string FeaturesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDashboardDatabaseSettings
    {
        string FeaturesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}