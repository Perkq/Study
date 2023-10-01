using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
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
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml.Linq;
using System.Configuration;

namespace lab8
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public NHist histForBack = new NHist();
        public NHist histForForward = new NHist();
        public Saf tempSaf;
        public static string str;
        string connectionString;
        bool fl = false;
        DataTable myTable;
        SqlConnection connection;
        SqlCommand command;
        SqlDataAdapter adapter1;
        public MainWindow()
        {
            InitializeComponent();
            connectionString = ConfigurationManager.AppSettings["ConnectionStr"].ToString();
            //connectionString = "server=ACROSS;DataBase = Test;Trusted_Connection = Yes;";
            Script.Items.Add("Извлечь всё");
            Script.Items.Add("Тип Close");
            Script.Items.Add("Тип с параметром");
            Script.Items.Add("Id как параметр");
        }



        public void RestoreDataBack(Saf data, bool flag)
        {
            //histForForward.Form.Push(SaveData());

            SqlTransaction tx = null;
            if (!data.flag)
            {
                if (flag)
                    histForForward.Form.Push(histForForward.SaveData(data.acc.id, data.acc.type, data.acc.date, data.acc.Owner, true));
                else
                    histForBack.Form.Push(histForBack.SaveData(data.acc.id, data.acc.type, data.acc.date, data.acc.Owner, true));
                script = "insert into ACCOUNT (NumAcc,typeOfDeposite,dateOfOpening,OwnerAcc) values(@Id,@type,@date,@owner)";
            }
            else
            {
                if (flag)
                    histForForward.Form.Push(histForForward.SaveData(data.acc.id, data.acc.type, data.acc.date, data.acc.Owner, false));
                else
                    histForBack.Form.Push(histForBack.SaveData(data.acc.id, data.acc.type, data.acc.date, data.acc.Owner, false));
                script = "delete from ACCOUNT where NumAcc = @id";
            }
            try
            {
                if (script != string.Empty)
                {
                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        connection.Open();
                        SqlCommand command = new SqlCommand(script, connection);
                        if (!data.flag)
                        {
                            SqlParameter IdParam = new SqlParameter("@Id", data.acc.id);
                            command.Parameters.Add(IdParam);
                            SqlParameter typeParam = new SqlParameter("@type", data.acc.type);
                            command.Parameters.Add(typeParam);
                            SqlParameter dateParam = new SqlParameter("@date", data.acc.date);
                            command.Parameters.Add(dateParam);
                            SqlParameter ownerParam = new SqlParameter("@owner", data.acc.Owner);
                            command.Parameters.Add(ownerParam);
                        }
                        else
                        {
                            SqlParameter IdParam = new SqlParameter("@Id", data.acc.id);
                            command.Parameters.Add(IdParam);
                        }
                        tx = connection.BeginTransaction();
                        command.Transaction = tx;
                        SqlDataReader reader = command.ExecuteReader();
                        MessageBox.Show("Успешно");
                        reader.Close();
                        tx.Commit();
                        Window_Loaded(new object(), new RoutedEventArgs());
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



        private void ClickBack(object sender, RoutedEventArgs e)
        {
            try
            {
                if (histForBack.Form.Count > 0)
                {
                    RestoreDataBack(histForBack.Form.Pop(), true);
                }
                else
                {
                    MessageBox.Show("Стек пуст,назад нельзя");
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void ClickForward(object sender, RoutedEventArgs e)
        {
            try
            {
                if (histForForward.Form.Count > 0)
                {
                    RestoreDataBack(histForForward.Form.Pop(), false);
                }
                else
                {
                    MessageBox.Show("Стек пуст,вперёд нельзя");
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                connection = new SqlConnection(connectionString);
                connection.Open();

                string sqlExpression = "SELECT * FROM ACCOUNT";
                myTable = new DataTable();

                command = new SqlCommand(sqlExpression, connection);
                adapter1 = new SqlDataAdapter(command);
                adapter1.Fill(myTable);
                MyBaseGrid.ItemsSource = myTable.DefaultView;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }
        private void UpdateDB()
        {
            SqlCommandBuilder comandbuilder = new SqlCommandBuilder(adapter1);
            adapter1.Update(myTable);
        }
        private void Update_Click(object sender, RoutedEventArgs e)
        {
            Window_Loaded(sender, e);
        }
        private void Delete_Click(object sender, RoutedEventArgs e)
        {

            if (MyBaseGrid.SelectedItems != null)
            {

                for (int i = 0; i < MyBaseGrid.SelectedItems.Count; i++)
                {
                    DataRowView datarowView = MyBaseGrid.SelectedItems[i] as DataRowView;
                    if (datarowView != null)
                    {
                        DataRow dataRow = (DataRow)datarowView.Row;
                        histForBack.Form.Push(histForBack.SaveData(dataRow));
                        dataRow.Delete();
                    }
                }
            }
            UpdateDB();
        }
        string script = string.Empty;
        private void Add_Click(object sender, RoutedEventArgs e)
        {
            add window = new add(ref histForBack);
            window.Show();
            Window_Loaded(new object(), new RoutedEventArgs());

        }
        private void addOwner(object sender, RoutedEventArgs e)
        {
            Owner window = new Owner();
            window.Show();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (MyBaseGrid.SelectedItems != null)
            {
                DataRowView tempId = MyBaseGrid.SelectedItem as DataRowView;
                if (tempId == null)
                    return;
                int id = (int)tempId.Row.ItemArray[0];
                Owner window = new Owner(id);
                window.Show();
            }
            Window_Loaded(sender, e);
        }
        //процедуры
        private void Procedure_Click(object sender, RoutedEventArgs e)
        {
            GetAccounts();
        }
        private void GetAccounts()
        {
            string sqlExpression = "ProCeDur";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.CommandType = CommandType.StoredProcedure;
                var reader = command.ExecuteReader();
                str = string.Empty;
                if (reader.HasRows)
                {

                    while (reader.Read())
                    {
                        object numAcc = reader.GetValue(0);
                        object type = reader.GetValue(1);
                        object date = reader.GetValue(2);
                        object owner = reader.GetValue(3);
                        str += $"{numAcc}, {type}, {date}, {owner}\n";
                    }
                }
                MessageBox.Show(str);
                reader.Close();
                Window_Loaded(new object(), new RoutedEventArgs());
            }
            //fl = true;
        }
        //запросы
        private void Script_Click(object sender, RoutedEventArgs e)
        {
            SqlTransaction tx = null;
            if (Script.SelectedIndex == 0)
                script = "Select * from ACCOUNT";
            else if (Script.SelectedIndex == 1)
                script = "select * from ACCOUNT where typeOfDeposite='Close'";
            else if (Script.SelectedIndex == 2)
                script = "select * from ACCOUNT where typeOfDeposite=@type";
            else if (Script.SelectedIndex == 3)
                script = "select * from ACCOUNT where NumAcc=@owner";
            else
            {
                MessageBox.Show("Выберите вариант запроса");
                return;
            }
            try
            {
                if (script != string.Empty)
                {
                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        connection.Open();
                        SqlCommand command = new SqlCommand(script, connection);
                        if (Script.SelectedIndex == 2)
                        {
                            if (TypeText.Text == string.Empty)
                            {
                                MessageBox.Show("Введите тип");
                                return;
                            }
                            SqlParameter nameParam = new SqlParameter("@type", TypeText.Text);
                            command.Parameters.Add(nameParam);
                        }
                        if (Script.SelectedIndex == 3)
                        {
                            if (IdText.Text == string.Empty)
                            {
                                MessageBox.Show("Введите тип");
                                return;
                            }
                            SqlParameter nameParam = new SqlParameter("@owner", IdText.Text);
                            command.Parameters.Add(nameParam);
                        }
                        tx = connection.BeginTransaction();
                        command.Transaction = tx;
                        SqlDataReader reader = command.ExecuteReader();
                        if (reader.HasRows)
                        {
                            str = $"{reader.GetName(0)}\t{reader.GetName(1)}\t{reader.GetName(2)}\t{reader.GetName(3)}\t\t\t\t\t\t\n";

                            while (reader.Read())
                            {
                                object numAcc = reader.GetValue(0);
                                object type = reader.GetValue(1);
                                object date = reader.GetValue(2);
                                object owner = reader.GetValue(3);
                                str += $"{numAcc}\t{type}\t\t{date}\t{owner}\t\n";
                            }
                        }
                        if (str != null)
                            MessageBox.Show(str);
                        else
                            MessageBox.Show("Пусто");
                        reader.Close();

                        tx.Commit();
                    }
                }
                else
                {
                    MessageBox.Show("enter script!");
                }
                Window_Loaded(new object(), new RoutedEventArgs());
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                tx.Rollback();
            }
        }
    }
}

