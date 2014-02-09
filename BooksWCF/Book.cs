using System;
using System.Runtime.Serialization;

namespace BooksWCF
{
    [DataContract]
    public class Book
    {
        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public string Author { get; set; }

        [DataMember]
        public string Category { get; set; }

        [DataMember]
        public string Link { get; set; }

        [DataMember]
        public string Series { get; set; }

        [DataMember]
        public Guid ID { get; set; }
    }
}