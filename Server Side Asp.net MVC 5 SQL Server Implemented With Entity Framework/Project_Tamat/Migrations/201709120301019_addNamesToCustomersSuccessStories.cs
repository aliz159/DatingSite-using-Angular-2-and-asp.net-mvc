namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNamesToCustomersSuccessStories : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SuccessStories", "FirstCustomerName", c => c.String());
            AddColumn("dbo.SuccessStories", "SecondCustomerName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SuccessStories", "SecondCustomerName");
            DropColumn("dbo.SuccessStories", "FirstCustomerName");
        }
    }
}
