using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace lab8
{
    /// <summary>
    /// Логика взаимодействия для add.xaml
    /// </summary>
    public partial class add : Window
    {
        NHist histForBack;
        public string str = "";
        public string script = "";
        public string connectionString = "server=ACROSS;DataBase=Test;Trusted_Connection = Yes";
        public add(ref NHist histForBack)
        {
            InitializeComponent();
            Type.Items.Add("Close");
            Type.Items.Add("Open");
            this.histForBack = histForBack;
        }
       
        private void Button_Click1(object sender, RoutedEventArgs e)
        {
            int temp;
            if (owner.Text == "" || dateofOpen.Text == "" || Id.Text == ""|| int.TryParse(Id.Text, out temp) == false)
            {
                MessageBox.Show($"Неверное заполнение");
                return;
            }
            SqlTransaction tx = null;
            script = "insert into ACCOUNT (NumAcc,typeOfDeposite,dateOfOpening,OwnerAcc) values(@Id,@type,@date,@owner)";
            try
            {
                if (script != "")
                {
                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        connection.Open();
                        SqlCommand command = new SqlCommand(script, connection);
                        SqlParameter IdParam = new SqlParameter("@Id", Id.Text);
                        command.Parameters.Add(IdParam);
                        SqlParameter typeParam = new SqlParameter("@type", Type.Text);
                        command.Parameters.Add(typeParam);
                        SqlParameter dateParam = new SqlParameter("@date", dateofOpen.Text);
                        command.Parameters.Add(dateParam);
                        SqlParameter ownerParam = new SqlParameter("@owner", owner.Text);
                        command.Parameters.Add(ownerParam);
                        tx = connection.BeginTransaction();
                        command.Transaction = tx;
                        SqlDataReader reader = command.ExecuteReader();
                        MessageBox.Show("Успешно");
                        histForBack.Form.Push(histForBack.SaveData(Id.Text,Type.Text,dateofOpen.Text,owner.Text,true));
                        reader.Close();

                        tx.Commit();
                    }
                }
                else
                {
                    MessageBox.Show("enter script!");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                tx.Rollback();
            }
        }
            private void Button_Close(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
   
}
