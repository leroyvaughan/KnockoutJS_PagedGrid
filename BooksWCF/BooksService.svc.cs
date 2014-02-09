using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using BooksWCF.DataLayer;

namespace BooksWCF
{
    public class BooksService : IBookService
    {
        public List<Book> GetAllBooks()
        {
            using (BooksIReadEntities db = new BooksIReadEntities())
            {
                db.Database.Connection.Open();
                var query = (from book in db.BooksTables
                             select new Book()
                                 {
                                     Title = book.Title,
                                     Author = book.Author,
                                     Category = book.Category,
                                     Series = book.Series,
                                     ID = book.ID
                                 }).OrderBy(x => x.Title);
                return query.ToList();
            }
        }
    }
}