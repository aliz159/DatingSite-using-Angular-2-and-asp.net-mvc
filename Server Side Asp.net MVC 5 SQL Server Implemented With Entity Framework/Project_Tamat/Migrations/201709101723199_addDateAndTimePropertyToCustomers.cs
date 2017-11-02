namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDateAndTimePropertyToCustomers : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "lastseenDate", c => c.String());
            AddColumn("dbo.Customers", "lastseenTime", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "lastseenTime");
            DropColumn("dbo.Customers", "lastseenDate");
        }
    }
}
