namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeTypePropertyInStoryClass : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SuccessStories", "FirstName", c => c.String());
            AddColumn("dbo.SuccessStories", "SecondName", c => c.String());
            DropColumn("dbo.SuccessStories", "CustomerIdFirst");
            DropColumn("dbo.SuccessStories", "CustomerIdSecond");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SuccessStories", "CustomerIdSecond", c => c.Long(nullable: false));
            AddColumn("dbo.SuccessStories", "CustomerIdFirst", c => c.Long(nullable: false));
            DropColumn("dbo.SuccessStories", "SecondName");
            DropColumn("dbo.SuccessStories", "FirstName");
        }
    }
}
