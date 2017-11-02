namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColFromSessions : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CustomersSessions", "SessionId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CustomersSessions", "SessionId");
        }
    }
}
