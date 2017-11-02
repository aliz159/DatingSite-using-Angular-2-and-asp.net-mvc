namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNamesToCustomersSessions : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CustomersSessions", "FirstCustomerName", c => c.String());
            AddColumn("dbo.CustomersSessions", "SecondCustomerName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CustomersSessions", "SecondCustomerName");
            DropColumn("dbo.CustomersSessions", "FirstCustomerName");
        }
    }
}
