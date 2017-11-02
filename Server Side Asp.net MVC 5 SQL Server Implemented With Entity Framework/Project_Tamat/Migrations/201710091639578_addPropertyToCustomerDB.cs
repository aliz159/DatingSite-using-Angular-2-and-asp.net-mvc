namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPropertyToCustomerDB : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "IsVerified", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "IsVerified");
        }
    }
}
