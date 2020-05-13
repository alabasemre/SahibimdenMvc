using SahibimdenMvc.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SahibimdenMvc.DAL
{
    public class SahibimdenContext : DbContext
    {
        public SahibimdenContext():base("cstr")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Araba>().ToTable("tblArabalar");
            modelBuilder.Entity<Araba>().Property(a => a.Ad).HasColumnType("varchar").HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Araba>().Property(a => a.UstKategori).HasColumnType("int").IsRequired();

            modelBuilder.Entity<Kategori>().ToTable("tblKategoriler");
            modelBuilder.Entity<Kategori>().Property(k => k.Ad).HasColumnType("varchar").HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Kategori>().Property(k => k.UstKategori).HasColumnType("int").IsRequired();

            modelBuilder.Entity<Duyuru>().ToTable("tblDuyurular");
            modelBuilder.Entity<Duyuru>().Property(d => d.Mesaj).HasColumnType("varchar").HasMaxLength(500).IsRequired();
            modelBuilder.Entity<Duyuru>().Property(d => d.Tarih).HasColumnType("varchar");
        }

        public DbSet<Araba> Arabalar { get; set; }
        public DbSet<Kategori> Kategoriler { get; set; }
        public DbSet<Duyuru> Duyurular { get; set; }
    }
}