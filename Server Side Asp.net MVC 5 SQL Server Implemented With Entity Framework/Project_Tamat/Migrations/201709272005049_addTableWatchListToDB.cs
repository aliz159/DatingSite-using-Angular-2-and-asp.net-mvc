namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTableWatchListToDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CustomerWatchLists",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CustomerIdViewer = c.Long(nullable: false),
                        CustomerIdViewed = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CustomerWatchLists");
        }
    }
}
