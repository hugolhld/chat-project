# coding: utf-8

import socket
import threading

HOST = "127.0.0.1"  
PORT = 1234
LISTEN_LIMIT = 5
active_client =  []

#func to listen message from a client
def listen_for_messages(client, username):

    while 1:
        message = client.rec(2048)('utf-8')
        if message != '':
            final_msg = username + '~' + message
            send_messages_to_all(final_msg)
        else:
            print(f"The message send by {username} is empty")

#fuct to send a message to single client
def send_message_to_client(client, message):
    client.sendall(message.encode())

#func to send message at a guy on a server
def send_messages_to_all(message):
    for user in active_client:
        
        send_message_to_client(user[1], message)
   
#fun to handle client
def client_handler(client):

     while 1:
        username = client.recv(2048).decode('utf-8')
        if username != '':
            active_client.append((username, client))
            break
        else:
            print("Client uername is empty")

            threading.Thread(target=listen_for_messages, args=(client, username, )).start()

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  
    try:
        server.bind((HOST, PORT))
        print(f"running server on {HOST} {PORT}")
    except Exception as e:
        print(f"Unable to bind to host {HOST} and port {PORT}: {e}")
        return

    server.listen(LISTEN_LIMIT)

    while True:
        client, address = server.accept()
        print(f"Successfully connected {address[0]} {address[1]}")

        threading.Thread(target=client_handler, args=(client, )).start()

if __name__ == '__main__':
    main()

