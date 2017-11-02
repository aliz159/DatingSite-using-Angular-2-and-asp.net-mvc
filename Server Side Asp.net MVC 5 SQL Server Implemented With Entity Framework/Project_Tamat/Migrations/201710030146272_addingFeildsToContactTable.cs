namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingFeildsToContactTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "LastUpdate", c => c.String());
            AddColumn("dbo.Contacts", "Status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Contacts", "Status");
            DropColumn("dbo.Contacts", "LastUpdate");
        }
    }
}
