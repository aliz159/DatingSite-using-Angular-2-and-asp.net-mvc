namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddImgToStoryClass : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SuccessStories", "Image", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SuccessStories", "Image");
        }
    }
}
