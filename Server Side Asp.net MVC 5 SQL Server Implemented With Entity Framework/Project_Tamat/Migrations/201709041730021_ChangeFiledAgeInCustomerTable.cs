namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeFiledAgeInCustomerTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "MinAgeRangeInterest", c => c.Int(nullable: false));
            AddColumn("dbo.Customers", "MaxAgeRangeInterest", c => c.Int(nullable: false));
            DropColumn("dbo.Customers", "AgeRangeInterest");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Customers", "AgeRangeInterest", c => c.String());
            DropColumn("dbo.Customers", "MaxAgeRangeInterest");
            DropColumn("dbo.Customers", "MinAgeRangeInterest");
        }
    }
}
