namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFileTSuccessClass : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SuccessStories", "Img", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SuccessStories", "Img");
        }
    }
}
