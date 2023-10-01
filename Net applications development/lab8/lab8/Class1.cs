using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace lab8
{
    public class Account
    {
        public string id = "";
        public string type = "";
        public string date = "";
        public string Owner = "";

        public Account(string id,string type,string date,string Owner)
        {
            this.id = id;
            this.type = type;
            this.date = date;
            this.Owner = Owner;
        }
        public Account()
        {

        }
    }
}
