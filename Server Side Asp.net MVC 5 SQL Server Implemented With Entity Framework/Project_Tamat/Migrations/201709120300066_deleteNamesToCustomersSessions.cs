namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleteNamesToCustomersSessions : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.CustomersSessions", "FirstCustomerName");
            DropColumn("dbo.CustomersSessions", "SecondCustomerName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CustomersSessions", "SecondCustomerName", c => c.String());
            AddColumn("dbo.CustomersSessions", "FirstCustomerName", c => c.String());
        }
    }
}
