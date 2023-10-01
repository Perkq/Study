#pragma comment(lib, "WS2_32.lib")   // �������  WS2_32.dll
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include "Winsock2.h"                // ���������  WS2_32.dll
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
    case WSAEINTR: msgText = "������ ������� ��������"; break;
    case WSAEACCES: msgText = "���������� ����������"; break;
    case WSAEFAULT: msgText = "��������� �����"; break;
    case WSAEINVAL: msgText = "������ � ���������"; break;
    case WSAEMFILE: msgText = "������� ����� ������ �������"; break;
    case WSAEWOULDBLOCK:msgText = "������ �������� ����������"; break;
    case WSAEINPROGRESS:msgText = "�������� � �������� ��������"; break;
    case WSAEALREADY: msgText = "�������� ��� �����������"; break;
    case WSAENOTSOCK:msgText = "����� ����� �����������"; break;
    case WSAEDESTADDRREQ:msgText = "��������� ����� ������������"; break;
    case WSAEMSGSIZE:msgText = "��������� ������� �������"; break;
    case WSAEPROTOTYPE:msgText = "������������ ��� ��������� ��� ������ "; break;
    case WSAENOPROTOOPT:msgText = "������ � ����� ���������"; break;
    case WSAEPROTONOSUPPORT:msgText = "�������� �� ��������������"; break;
    case WSAESOCKTNOSUPPORT:msgText = "��� ������ �� ��������������"; break;
    case WSAEOPNOTSUPP:msgText = "�������� �� ��������������"; break;
    case WSAEPFNOSUPPORT:msgText = "��� ���������� �� ��������������"; break;
    case WSAEAFNOSUPPORT:msgText = "��� ������� �� �������������� ����������"; break;
    case WSAEADDRINUSE:msgText = "����� ��� ������������"; break;
    case WSAEADDRNOTAVAIL:msgText = "����������� ����� �� ����� ���� �����������"; break;
    case WSAENETDOWN:msgText = "���� ���������"; break;
    case WSAENETUNREACH:msgText = "���� �� ���������"; break;
    case WSAENETRESET:msgText = "���� �� ���������"; break;
    case WSAECONNABORTED:msgText = "����������� ����� �����"; break;
    case WSAECONNRESET:msgText = "����� �������������"; break;
    case WSAENOBUFS:msgText = "�� ������� ������ ��� �������"; break;
    case WSAEISCONN:msgText = "����� ��� ���������"; break;
    case WSAENOTCONN:msgText = "����� �� ���������"; break;
    case WSAESHUTDOWN:msgText = "������ ��������� send: ����� �������� ������"; break;
    case WSAETIMEDOUT:msgText = "���������� ���������� �������� �������"; break;
    case WSAECONNREFUSED:msgText = "���������� ���������"; break;
    case WSAEHOSTDOWN:msgText = "���������� ��������� "; break;
    case WSAEHOSTUNREACH:msgText = "��� �������� ��� �����"; break;
    case WSAEPROCLIM:msgText = "������� ����� ���������"; break;
    case WSASYSNOTREADY:msgText = "���� �� ��������"; break;
    case WSAVERNOTSUPPORTED:msgText = "������ ������ ����������"; break;
    case WSANOTINITIALISED:msgText = "�� ��������� ������������� WS2_32.DLL"; break;
    case WSAEDISCON:msgText = "����������� ����������"; break;
    case WSATYPE_NOT_FOUND:msgText = "����� �� ������"; break;
    case WSAHOST_NOT_FOUND:msgText = "���� �� ������"; break;
    case WSATRY_AGAIN:msgText = "������������������ ���� �� ������"; break;
    case WSANO_RECOVERY:msgText = "�������������� ������"; break;
    case WSANO_DATA:msgText = "��� ������ ������������ ����"; break;
    case WSA_INVALID_HANDLE:msgText = "��������� ���������� ������� � �������"; break;
    case WSA_INVALID_PARAMETER:msgText = "���� ��� ����� ���������� � �������"; break;
    case WSA_IO_INCOMPLETE:msgText = "������ �����-������ �� � ���������� ���������"; break;
    case WSA_IO_PENDING:msgText = "�������� ���������� �����"; break;
    case WSA_NOT_ENOUGH_MEMORY:msgText = "�� ���������� ������"; break;
    case WSA_OPERATION_ABORTED:msgText = "�������� ����������"; break;
    case WSAEINVALIDPROCTABLE:msgText = "��������� ������"; break;
    case WSAEINVALIDPROVIDER:msgText = "������ � ������ �������"; break;
    case WSAEPROVIDERFAILEDINIT:msgText = "���������� ���������������� ������"; break;
    case WSASYSCALLFAILURE:msgText = "��������� ���������� ���������� ������"; break;
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
    SOCKET  sS;    // ���������� ������ 
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


        //����������� ������
        SOCKET cS;
        SOCKADDR_IN clnt;
        memset(&clnt, 0, sizeof(clnt));
        int lclnt = sizeof(clnt);

        clock_t start, end;
        char ibuf[50], obuf[50] = "server: ������� ";
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
                if ((libuf = recv(cS, ibuf, sizeof(ibuf), NULL)) == SOCKET_ERROR) { //������� ������ �� ������� 
                    cout << "Client disconnect: " << GetErrorMsgText(WSAGetLastError()) << endl;
                    flag = true;
                    break;
                }

                if (flag) {
                    flag = false;
                    start = clock();//������� 
                }

                string obuf = ibuf;
                if ((lobuf = send(cS, obuf.c_str(), strlen(obuf.c_str()) + 1, NULL)) == SOCKET_ERROR) {
                    throw SetErrorMsgText("send: ", WSAGetLastError());//���������� �������
                }

                if (strcmp(ibuf, "") == 0) {
                    flag = true;
                    end = clock();
                    cout << "Time for send and recv: " << ((double)(end - start) / CLK_TCK) << " c\n\n"; //����� 
                    break;
                }
                else {
                    cout << ibuf << endl;
                }
            }
        }
        //��������� ������
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
    //��������� ������������� ����������

    catch (string errorMsgText)
    {
        cout << endl << "WSAGetLastError: " << errorMsgText;
    }

}
