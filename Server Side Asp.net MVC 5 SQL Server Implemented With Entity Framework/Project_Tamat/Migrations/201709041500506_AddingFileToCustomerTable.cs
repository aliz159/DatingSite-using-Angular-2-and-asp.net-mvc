namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingFileToCustomerTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Sport", c => c.String());
            AddColumn("dbo.Customers", "Smoking", c => c.String());
            DropColumn("dbo.Customers", "LikesNumber");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Customers", "LikesNumber", c => c.String());
            DropColumn("dbo.Customers", "Smoking");
            DropColumn("dbo.Customers", "Sport");
        }
    }
}
