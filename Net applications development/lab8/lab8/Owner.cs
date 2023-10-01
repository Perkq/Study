using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls.Primitives;

namespace lab8
{
    public class NHist
    {
        public Stack<Saf> Form { get; private set; }
        public NHist()
        {
            Form = new Stack<Saf>();
        }
        public Saf SaveData(string id, string type, string date, string owner,bool flag)
        {
            return new Saf(id,type,date,owner,flag);
        }
        public Saf SaveData(DataRow str)
        {
            return new Saf(str);
        }
    }
    public class Saf
    {
        public Account acc = new Account();
        public bool flag = false;
        public Saf(string id,string type,string date,string owner,bool flag)
        {
            acc.id = id;
            acc.type = type;
            acc.date = date;
            acc.Owner = owner;
            this.flag = flag;
        }
        public Saf(DataRow acc)
        {
            this.acc.id = acc[0].ToString();
            this.acc.type = acc[1].ToString();
            this.acc.date = acc[2].ToString();
            this.acc.Owner = acc[3].ToString();
        }
    }
}
