#define _WINSOCK_DEPRECATED_NO_WARNINGS

#include <iostream>
#include <clocale>
#include <ctime>

#include "ErrorMsgText.h"
#include "Winsock2.h"
#pragma comment(lib, "WS2_32.lib")

using namespace std;

int main()
{
	setlocale(LC_ALL, "rus");

	WSADATA wsaData;
	SOCKET cC;

	try {
		if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
			throw  SetErrorMsgText("Startup: ", WSAGetLastError());
		}
		if ((cC = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET) {
			throw  SetErrorMsgText("socket: ", WSAGetLastError());
		}

		SOCKADDR_IN serv;
		int ls = sizeof(serv);
		serv.sin_family = AF_INET;
		serv.sin_port = htons(2000);
		serv.sin_addr.s_addr = inet_addr("127.0.0.1");
		//serv.sin_addr.s_addr = inet_addr("192.168.43.158");

		SOCKADDR_IN clientInfo;
		memset(&clientInfo, 0, sizeof(clientInfo));
		// char ibuf[50];
		int lc = sizeof(clientInfo), lb = 0, lobuf = 0;

		clock_t start, end;
		char ibuf[50] = "server: принято ";
		int  libuf = 0;

		int countMessage;
		cout << "\nNumber of messages: \n\n";
		cin >> countMessage;
		bool flag = true;

		start = clock();
		for (int i = 1; i <= countMessage; i++) {

			string obuf = "hello" + to_string(i) + "\n";

			if ((libuf = sendto(cC, obuf.c_str(), obuf.length() + 1, NULL,
				(SOCKADDR*)&serv, sizeof(serv))) == SOCKET_ERROR) {
				throw  SetErrorMsgText("sendto: ", WSAGetLastError());
			}

			//cout << obuf;
		}
		end = clock();
		string obuf = "";
		cout << "\nTime for sendto: " << ((double)(end - start) / CLK_TCK) << " c\n\n";

		if ((libuf = sendto(cC, obuf.c_str(), strlen(obuf.c_str()) + 1, NULL,
			(SOCKADDR*)&serv, sizeof(serv))) == SOCKET_ERROR) {
			throw  SetErrorMsgText("sendto: ", WSAGetLastError());
		}


		for (int i = 1; i <= countMessage; i++)
		{
			if ((lb = recvfrom(cC, ibuf, sizeof(ibuf), NULL, (sockaddr*)&clientInfo, &lc)) == SOCKET_ERROR) {
				throw  SetErrorMsgText("recvfrom: ", WSAGetLastError());
			}
			if (flag) {
				flag = false;
				start = clock();
			}
			cout << ibuf;
		}
		end = clock();
		cout << "\nTime for recvfrom: " << ((double)(end - start) / CLK_TCK) << " c\n\n";



		if (closesocket(cC) == SOCKET_ERROR) {
			throw SetErrorMsgText("closesocket: ", WSAGetLastError());
		}
		if (WSACleanup() == SOCKET_ERROR) {
			throw  SetErrorMsgText("Cleanup: ", WSAGetLastError());
		}
	}
	catch (string errorMsgText) {
		cout << endl << errorMsgText;
	}

	system("pause");
	return 0;
}