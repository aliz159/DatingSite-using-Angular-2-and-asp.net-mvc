namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingPropertyToClasses : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Likes", c => c.Int(nullable: false));
            AddColumn("dbo.Customers", "Image", c => c.String());
            AddColumn("dbo.Customers", "LastSeenDate", c => c.String());
            AddColumn("dbo.Customers", "LastSeenTime", c => c.String());
            AddColumn("dbo.SuccessStories", "FirstCustomerName", c => c.String());
            AddColumn("dbo.SuccessStories", "SecondCustomerName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SuccessStories", "SecondCustomerName");
            DropColumn("dbo.SuccessStories", "FirstCustomerName");
            DropColumn("dbo.Customers", "LastSeenTime");
            DropColumn("dbo.Customers", "LastSeenDate");
            DropColumn("dbo.Customers", "Image");
            DropColumn("dbo.Customers", "Likes");
        }
    }
}
