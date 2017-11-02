namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingFileToStoryTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SuccessStories", "ShortStory", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SuccessStories", "ShortStory");
        }
    }
}
