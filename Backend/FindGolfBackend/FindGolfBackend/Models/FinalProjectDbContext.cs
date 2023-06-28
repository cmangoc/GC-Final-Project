using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FindGolfBackend.Models;

public partial class FinalProjectDbContext : DbContext
{
    public FinalProjectDbContext()
    {
    }

    public FinalProjectDbContext(DbContextOptions<FinalProjectDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer($"Data Source={Secret.Server};Initial Catalog=FinalProjectDB; User Id={Secret.UserName}; Password={Secret.Password}");

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Course>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Courses__3213E83F405DC622");

      entity.Property(e => e.Id).HasColumnName("id");
      entity.Property(e => e.CourseName)
          .HasMaxLength(255)
          .HasColumnName("courseName");
      entity.Property(e => e.Zip)
          .HasMaxLength(5)
          .HasColumnName("zip");
    });

    modelBuilder.Entity<Review>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Reviews__3213E83F0E71FA0F");

      entity.Property(e => e.Id).HasColumnName("id");
      entity.Property(e => e.CourseName).HasMaxLength(255);
      entity.Property(e => e.Review1)
          .HasMaxLength(300)
          .HasColumnName("review");
      entity.Property(e => e.zipCode).HasMaxLength(5);

      entity.HasOne(d => d.User).WithMany(p => p.Reviews)
          .HasForeignKey(d => d.UserId)
          .HasConstraintName("FK__Reviews__UserId__6FE99F9F");
    });

    modelBuilder.Entity<User>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__User__3213E83F2236F337");

      entity.ToTable("User");

      entity.Property(e => e.Id).HasColumnName("id");
      entity.Property(e => e.Email)
          .HasMaxLength(255)
          .HasColumnName("email");
      entity.Property(e => e.Name).HasMaxLength(50);
    });

    OnModelCreatingPartial(modelBuilder);
  }

  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
