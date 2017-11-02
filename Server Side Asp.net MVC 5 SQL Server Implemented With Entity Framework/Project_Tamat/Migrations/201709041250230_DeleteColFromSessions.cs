namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeleteColFromSessions : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.CustomersSessions", "SessionId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CustomersSessions", "SessionId", c => c.Long(nullable: false));
        }
    }
}
