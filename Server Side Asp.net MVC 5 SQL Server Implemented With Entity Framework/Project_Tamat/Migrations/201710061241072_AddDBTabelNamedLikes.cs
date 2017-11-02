namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDBTabelNamedLikes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CustomerLikes",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CustomerIdLiked = c.Long(nullable: false),
                        CustomerIdILike = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CustomerLikes");
        }
    }
}
