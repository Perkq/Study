#include "stdafx.h"
#include <string>
#include <iostream>
#include "Winsock2.h" //заголовок WS2_32.dll
#pragma comment(lib, "WS2_32.lib") //экспорт WS2_32.dll
#include "Error.h"
#include <ctime>

using namespace std;

#define _WINSOCK_DEPRECATED_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#pragma warning(disable : 4996)

SOCKET sS;


bool GetRequestFromClient(char* name, sockaddr* from, int* flen)
{
	char ibuf[50];
	while (true)
	{
		if (recvfrom(sS, ibuf, sizeof(ibuf), NULL, from, flen) == SOCKET_ERROR)
		{
			if (WSAGetLastError() == WSAETIMEDOUT)
				return false;
			throw SetErrorMsgText("recvfrom: ", WSAGetLastError());
		}
		if (strcmp(ibuf, name) == 0)
		{
			cout << "Client socket: " << inet_ntoa(((SOCKADDR_IN*)from)->sin_addr) << ":" << htons(((SOCKADDR_IN*)from)->sin_port) << endl;
			return true;
		}
		return false;
	}
}

void PutAnswerToClient(char* name, sockaddr* to, int* lto)
{
	if ((sendto(sS, name, strlen(name) + 1, NULL, to, *lto)) == SOCKET_ERROR)
		throw  SetErrorMsgText("send:", WSAGetLastError());
}

void main()
{

	WSADATA wsaData;

	char call[] = "MyName";
	char hostname[32];
	try
	{
		if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)
			throw SetErrorMsgText("Startup: ", WSAGetLastError());
		if ((sS = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
			throw SetErrorMsgText("Socket: ", WSAGetLastError());

		cout << "WAITING" << endl;

		SOCKADDR_IN serv;
		serv.sin_family = AF_INET;
		serv.sin_port = htons(2000);
		serv.sin_addr.s_addr = INADDR_ANY;
		if (bind(sS, (LPSOCKADDR)&serv, sizeof(serv)) == SOCKET_ERROR)
			throw SetErrorMsgText("bind: ", WSAGetLastError());

		SOCKADDR_IN from;
		memset(&from, 0, sizeof(from));
		int lfrom = sizeof(from);

		gethostname(hostname, sizeof(hostname));
		cout << "Server: " << hostname << endl;
		do
		{
			if (GetRequestFromClient(call, (sockaddr*)&from, &lfrom))
			{
				cout << "From Client: " << gethostbyaddr((char*)&from.sin_addr, sizeof(from.sin_addr), AF_INET)->h_name << endl;
				PutAnswerToClient(call, (sockaddr*)&from, &lfrom);
			}
			else
				cout << "Error" << endl;
		} while (true);
	}
	catch (string errorMsgText)
	{
		cout << "WSAGetLastError: " << errorMsgText << endl;
	}
	system("pause");
}