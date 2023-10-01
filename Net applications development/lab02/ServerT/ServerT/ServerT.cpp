#pragma comment(lib, "WS2_32.lib")   // экспорт  WS2_32.dll
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include "Winsock2.h"                // заголовок  WS2_32.dll
#include <iostream>
#include <string.h>
#include <clocale>
#include <ctime>
#include <string>
using namespace std;


using namespace std;

string GetErrorMsgText(int code) 
{
    setlocale(LC_ALL, "rus");
    string msgText;
    switch (code)
    {
    case WSAEINTR: msgText = "Работа функции прервана"; break;
    case WSAEACCES: msgText = "Разрешение отвергнуто"; break;
    case WSAEFAULT: msgText = "Ошибочный адрес"; break;
    case WSAEINVAL: msgText = "Ошибка в аргументе"; break;
    case WSAEMFILE: msgText = "Слишком много файлов открыто"; break;
    case WSAEWOULDBLOCK:msgText = "Ресурс временно недоступен"; break;
    case WSAEINPROGRESS:msgText = "Операция в процессе развития"; break;
    case WSAEALREADY: msgText = "Операция уже выполняется"; break;
    case WSAENOTSOCK:msgText = "Сокет задан неправильно"; break;
    case WSAEDESTADDRREQ:msgText = "Требуется адрес расположения"; break;
    case WSAEMSGSIZE:msgText = "Сообщение слишком длинное"; break;
    case WSAEPROTOTYPE:msgText = "Неправильный тип протокола для сокета "; break;
    case WSAENOPROTOOPT:msgText = "Ошибка в опции протокола"; break;
    case WSAEPROTONOSUPPORT:msgText = "Протокол не поддерживается"; break;
    case WSAESOCKTNOSUPPORT:msgText = "Тип сокета не поддерживается"; break;
    case WSAEOPNOTSUPP:msgText = "Операция не поддерживается"; break;
    case WSAEPFNOSUPPORT:msgText = "Тип протоколов не поддерживается"; break;
    case WSAEAFNOSUPPORT:msgText = "Тип адресов не поддерживается протоколом"; break;
    case WSAEADDRINUSE:msgText = "Адрес уже используется"; break;
    case WSAEADDRNOTAVAIL:msgText = "Запрошенный адрес не может быть использован"; break;
    case WSAENETDOWN:msgText = "Сеть отключена"; break;
    case WSAENETUNREACH:msgText = "Сеть не достижима"; break;
    case WSAENETRESET:msgText = "Сеть не достижима"; break;
    case WSAECONNABORTED:msgText = "Программный отказ связи"; break;
    case WSAECONNRESET:msgText = "Связь восстановлена"; break;
    case WSAENOBUFS:msgText = "Не хватает памяти для буферов"; break;
    case WSAEISCONN:msgText = "Сокет уже подключен"; break;
    case WSAENOTCONN:msgText = "Сокет не подключен"; break;
    case WSAESHUTDOWN:msgText = "Нельзя выполнить send: сокет завершил работу"; break;
    case WSAETIMEDOUT:msgText = "Закончился отведенный интервал времени"; break;
    case WSAECONNREFUSED:msgText = "Соединение отклонено"; break;
    case WSAEHOSTDOWN:msgText = "Соединение отклонено "; break;
    case WSAEHOSTUNREACH:msgText = "Нет маршрута для хоста"; break;
    case WSAEPROCLIM:msgText = "Слишком много процессов"; break;
    case WSASYSNOTREADY:msgText = "Сеть не доступна"; break;
    case WSAVERNOTSUPPORTED:msgText = "Данная версия недоступна"; break;
    case WSANOTINITIALISED:msgText = "Не выполнена инициализация WS2_32.DLL"; break;
    case WSAEDISCON:msgText = "Выполняется отключение"; break;
    case WSATYPE_NOT_FOUND:msgText = "Класс не найден"; break;
    case WSAHOST_NOT_FOUND:msgText = "Хост не найден"; break;
    case WSATRY_AGAIN:msgText = "Неавторизированный хост не найден"; break;
    case WSANO_RECOVERY:msgText = "Неопределенная ошибка"; break;
    case WSANO_DATA:msgText = "Нет записи запрошенного типа"; break;
    case WSA_INVALID_HANDLE:msgText = "Указанный дескриптор события с ошибкой"; break;
    case WSA_INVALID_PARAMETER:msgText = "Один или более параметров с ошибкой"; break;
    case WSA_IO_INCOMPLETE:msgText = "Объект ввода-вывода не в сигнальном состоянии"; break;
    case WSA_IO_PENDING:msgText = "Операция завершится позже"; break;
    case WSA_NOT_ENOUGH_MEMORY:msgText = "Не достаточно памяти"; break;
    case WSA_OPERATION_ABORTED:msgText = "Операция отвергнута"; break;
    case WSAEINVALIDPROCTABLE:msgText = "Ошибочный сервис"; break;
    case WSAEINVALIDPROVIDER:msgText = "Ошибка в версии сервиса"; break;
    case WSAEPROVIDERFAILEDINIT:msgText = "Невозможно инициализировать сервис"; break;
    case WSASYSCALLFAILURE:msgText = "Аварийное завершение системного вызова"; break;
    default: msgText = "***ERROR***"; break;
    };
    return msgText;
};
string SetErrorMsgText(string msgText, int code)
{
    return msgText + GetErrorMsgText(code);
};
void main()
{
    setlocale(LC_ALL, "rus");
    WSADATA wsaData;
    SOCKET  sS;    // дескриптор сокета 
    SOCKADDR_IN serv;
    serv.sin_family = AF_INET;
    serv.sin_port = htons(2000);
    serv.sin_addr.s_addr = INADDR_ANY;
    //serv.sin_addr.s_addr = inet_addr("192.168.43.176");

    try
    {

        if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0) { 
            throw  SetErrorMsgText("Startup: ", WSAGetLastError());
        }

        if ((sS = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET) { 
            throw  SetErrorMsgText("socket: ", WSAGetLastError());
        }

        if (bind(sS, (LPSOCKADDR)&serv, sizeof(serv)) == SOCKET_ERROR) {
            throw  SetErrorMsgText("bind: ", WSAGetLastError());
        }
        if (listen(sS, SOMAXCONN) == SOCKET_ERROR) { 
            throw SetErrorMsgText("listen: ", WSAGetLastError());
        }


        //подключился клиент
        SOCKET cS;
        SOCKADDR_IN clnt;
        memset(&clnt, 0, sizeof(clnt));
        int lclnt = sizeof(clnt);

        clock_t start, end;
        char ibuf[50], obuf[50] = "server: принято ";
        int libuf = 0, lobuf = 0;
        bool flag = true;

        while (true) {
            cout << "ServerT\n\n";
            if ((cS = accept(sS, (sockaddr*)&clnt, &lclnt)) == INVALID_SOCKET) { 
                throw SetErrorMsgText("accept: ", WSAGetLastError());
            }
            cout << "         Client connect: " << endl;  
            cout << "ADDRES client :          " << inet_ntoa(clnt.sin_addr) << " : " << htons(clnt.sin_port) << endl << endl << endl << endl << endl;
            while (true) {
                if ((libuf = recv(cS, ibuf, sizeof(ibuf), NULL)) == SOCKET_ERROR) { //принять данные от клиента 
                    cout << "Client disconnect: " << GetErrorMsgText(WSAGetLastError()) << endl;
                    flag = true;
                    break;
                }

                if (flag) {
                    flag = false;
                    start = clock();//считаем 
                }

                string obuf = ibuf;
                if ((lobuf = send(cS, obuf.c_str(), strlen(obuf.c_str()) + 1, NULL)) == SOCKET_ERROR) {
                    throw SetErrorMsgText("send: ", WSAGetLastError());//отправляем клиенту
                }

                if (strcmp(ibuf, "") == 0) {
                    flag = true;
                    end = clock();
                    cout << "Time for send and recv: " << ((double)(end - start) / CLK_TCK) << " c\n\n"; //время 
                    break;
                }
                else {
                    cout << ibuf << endl;
                }
            }
        }
        //закрываем сокеты
        if (closesocket(sS) == SOCKET_ERROR) {
            throw  SetErrorMsgText("closesocket: ", WSAGetLastError());
        }
        if (closesocket(cS) == SOCKET_ERROR) {
            throw  SetErrorMsgText("closesocket: ", WSAGetLastError());
        }
        if (WSACleanup() == SOCKET_ERROR) {
            throw  SetErrorMsgText("Cleanup: ", WSAGetLastError());
        }
    }
    //Завершаем использование библиотеки

    catch (string errorMsgText)
    {
        cout << endl << "WSAGetLastError: " << errorMsgText;
    }

}
