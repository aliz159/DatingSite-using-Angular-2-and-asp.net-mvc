namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDateAndTime : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CustomersSessions", "SessionDate", c => c.String());
            AddColumn("dbo.CustomersSessions", "SessionTime", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CustomersSessions", "SessionTime");
            DropColumn("dbo.CustomersSessions", "SessionDate");
        }
    }
}
