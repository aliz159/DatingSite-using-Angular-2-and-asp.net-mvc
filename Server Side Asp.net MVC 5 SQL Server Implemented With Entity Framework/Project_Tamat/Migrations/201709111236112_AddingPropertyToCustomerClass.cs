namespace Project_Tamat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingPropertyToCustomerClass : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "NumberOfLikes", c => c.Int(nullable: false));
            AddColumn("dbo.Customers", "Image", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "Image");
            DropColumn("dbo.Customers", "NumberOfLikes");
        }
    }
}
