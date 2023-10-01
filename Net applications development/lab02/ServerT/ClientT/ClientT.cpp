#pragma comment(lib, "WS2_32.lib")   // �������  WS2_32.dll
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include "Winsock2.h"                // ���������  WS2_32.dll
#include <iostream>
#include <string.h>
#include <clocale>
#include <ctime>
#include <string>
using namespace std;

string  GetErrorMsgText(int code)    // c����������� ����� ������ 
{
	setlocale(LC_ALL, "rus");
	string msgText;
	switch (code)                      // �������� ���� ��������  
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

string  SetErrorMsgText(string msgText, int code)
{
	return  msgText + GetErrorMsgText(code);
};


void main()
{
	setlocale(LC_ALL, "rus");
	WSADATA wsaData;
	SOCKET cC;
	SOCKADDR_IN serv;
	serv.sin_family = AF_INET;
	serv.sin_port = htons(2000);
	//serv.sin_addr.s_addr = inet_addr("192.168.0.104");
	serv.sin_addr.s_addr = inet_addr("192.168.43.158");
	//serv.sin_addr.s_addr = inet_addr("127.0.0.1");

	try {
		cout << "ClientT\n\n";

		if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0) {
			throw  SetErrorMsgText("Startup: ", WSAGetLastError());
		}
		if ((cC = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET) {
			throw  SetErrorMsgText("socket: ", WSAGetLastError());
		}

		if ((connect(cC, (sockaddr*)&serv, sizeof(serv))) == SOCKET_ERROR) { //����� ��� ����������
			throw SetErrorMsgText("connect: ", WSAGetLastError());
		}

		clock_t start, end;
		char ibuf[50] = "server: ������� ";
		int  libuf = 0, lobuf = 0;

		int countMessage;
		cout << "Number of messages: ";
		cin >> countMessage;

		start = clock(); //����
		for (int i = 1; i <= countMessage; i++) {
			string obuf = "Hello from Client " + to_string(i);

			if ((lobuf = send(cC, obuf.c_str(), strlen(obuf.c_str()) + 1, NULL)) == SOCKET_ERROR) { //����������
				throw SetErrorMsgText("send: ", WSAGetLastError());
			}

			if ((libuf = recv(cC, ibuf, sizeof(ibuf), NULL)) == SOCKET_ERROR) {//���������
				throw SetErrorMsgText("recv: ", WSAGetLastError());
			}

			cout << ibuf << endl;
		}
		end = clock();
		string obuf = "";

		if ((lobuf = send(cC, obuf.c_str(), strlen(obuf.c_str()) + 1, NULL)) == SOCKET_ERROR) {
			throw SetErrorMsgText("send: ", WSAGetLastError());
		}

		cout << "Time for send and recv: " << ((double)(end - start) / CLK_TCK) << " c" << endl;

		if (closesocket(cC) == SOCKET_ERROR) {
			throw SetErrorMsgText("closesocket: ", WSAGetLastError());
		}
		if (WSACleanup() == SOCKET_ERROR) {
			throw  SetErrorMsgText("Cleanup: ", WSAGetLastError());
		}

	}
	catch (string errorMsgText)
	{
		cout << endl << "WSAGetLastError: " << errorMsgText;
	}
}