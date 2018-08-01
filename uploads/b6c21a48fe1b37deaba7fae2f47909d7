/*Terrell Byrd
 Project 08 /Client
*/


#include <stdio.h>
#include <string.h>
#include <unistd.h>
int main (){
    char command[50];
    strcpy( command, "ls -l");
    system(command);
    return(0);}





/*
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>


void myError(char *myMessage);
int main(int argSize, char **argArray)
{
	struct sockaddr_in serverAddress;
	struct hostent * server;
	printf("* Socket Example - Client Side *\n");
    int clientSocket;
	
	{
        myError("Opening Client socket failed");
	}
	server= gethostbyname(hostName);
	if(server== NULL)
	{
		myError("host error");
	}
	bzero((char *)&serverAddress, sizeof(serverAddress));
	serverAddress.sin_family= AF_INET;
	bcopy((char *)server->h_addr, (char *)&serverAddress.sin_addr.s_addr, server->h_length);
    unsigned port= 2000;
	serverAddress.sin_port = htons(port);
	if (connect(clientSocket, (struct sockaddr *)&serverAddress, sizeof(serverAddress)) < 0)
	{
		myError("server connection failed");
	}
	printf("Number for server: ");
	bzero(mybuffer, 256);
	fgets(mybuffer, 255, stdin);
	if (write(clientSocket, mybuffer, strlen(mybuffer))< 0)
	{
		myError("writing to client socket failed");
	}
	bzero(mybuffer, 256);
	if(read(clientSocket, mybuffer, 255)< 0)
	{
	
}

void myError(char *myMessage)
{
	printf("Error: %s\n", myMessage);
	exit(1);
}
*/
