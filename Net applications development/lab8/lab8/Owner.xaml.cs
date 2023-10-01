using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;



namespace lab8
{
    /// <summary>
    /// Логика взаимодействия для Owner.xaml
    /// </summary>
    public partial class Owner : Window
    {
        int id;
        bool flag = false;
        public string path;
        public string str = "";
        public string script = "";
        public string connectionString = "server=ACROSS;DataBase=Test;Trusted_Connection = Yes";
        public Owner()
        {
            InitializeComponent();
            owner.IsReadOnly = false;
        }
        public Owner(int id)
        {
            this.id = id;
            flag = true;

            InitializeComponent();

            SqlTransaction t = null;
            script = $"Select Owners.NameOwner,Owners.Passport,Owners.Birthdate,Owners.Image from Owners join ACCOUNT on Owners.NameOwner = ACCOUNT.OwnerAcc where ACCOUNT.NumAcc = {id}";
            using (SqlConnection cnn = new SqlConnection(connectionString))
            {
                cnn.Open(); 
                using (SqlCommand cmd = new SqlCommand(script, cnn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows) // если есть данные
                    {
                        // выводим названия столбцов

                        while (reader.Read()) // построчно считываем данные
                        {
                            owner.Text = (reader.GetValue(0)).ToString();
                            passport.Text = (reader.GetValue(1)).ToString();
                            dateofbirth.Text = (reader.GetValue(2)).ToString();

                            BitmapImage bi = new BitmapImage();
                            bi.BeginInit();
                            bi.CreateOptions = BitmapCreateOptions.None;
                            bi.CacheOption = BitmapCacheOption.Default;
                            bi.StreamSource = new MemoryStream((byte[])reader.GetValue(3));
                            bi.EndInit();
                            imgDynamic.Source = bi;
                           

                           
                            
                        }
                    }
                }
            }
            owner.IsReadOnly = true;

        }
        private void Button_Click(object sender,RoutedEventArgs e)
        {
            try
            {
                OpenFileDialog openFile = new OpenFileDialog();
                openFile.Filter = "Image files (*.png;*.jpg)|*.png;*.jpg|All files (*.*)|*.*";
                if(openFile.ShowDialog() == true)
                {
                    path = openFile.FileName;
                    Uri file = new Uri(openFile.FileName);
                    imgDynamic.Source = new BitmapImage(file);
                }
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        private void Button_Close(object sender,RoutedEventArgs e)
        {
            this.Close();
        }
        private void Button_Click1(object sender,RoutedEventArgs e)
        {
            SqlTransaction tx = null;
            MessageBox.Show(owner.Text + dateofbirth.Text + passport.Text + path);
            byte[] some_image_bytes = null;
            
            if (path == null ||owner.Text == "" ||dateofbirth.Text == "" || passport.Text == ""|| !System.Text.RegularExpressions.Regex.Match(owner.Text, @"[а-яА-Я]|[a-zA-Z]").Success || !System.Text.RegularExpressions.Regex.Match(passport.Text, @"\d{7}A\d{3}PB\d").Success)
            {
                MessageBox.Show($"Неверное заполнение");
                return;
            }
                some_image_bytes = File.ReadAllBytes(path);
            //var str = System.Text.Encoding.Default.GetString(some_image_bytes);
            if (!flag)
                script = $"insert into Owners (NameOwner,Passport,Birthdate,Image) values('{owner.Text}','{passport.Text}','{dateofbirth.Text}',"+ @"@ImageData" + ")";
            else
                script = $"update Owners set Passport = '{passport.Text}' , Birthdate = '{dateofbirth.Text}', Image = " +@"@ImageData" + $" where NameOwner like '{owner.Text}'";
            try
            {
                if (script != "")
                {
                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        connection.Open();
                        SqlCommand command = new SqlCommand(script, connection);
                        command.Parameters.Add("@ImageData", SqlDbType.Image, 1000000);
                        command.Parameters["@ImageData"].Value = some_image_bytes;
                        tx = connection.BeginTransaction();
                        command.Transaction = tx;
                        command.ExecuteNonQuery(); // запустим
                       
                        
   
                        MessageBox.Show("Успешно");
                       
                        tx.Commit();
                        this.Close();

                       
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
    }
}
