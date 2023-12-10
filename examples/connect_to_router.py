import paramiko

def connect_to_router(hostname, port, username, password, command):
    # Create an SSH client
    client = paramiko.SSHClient()

    # Automatically add the server's host key (this is insecure and should be avoided in production)
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        # Connect to the router
        client.connect(hostname, port=port, username=username, password=password)

        # Execute the specified command
        stdin, stdout, stderr = client.exec_command(command)

        # Print the output of the command
        print("Command Output:")
        print(stdout.read().decode("utf-8"))

        # After executing your commands, close the SSH connection
        client.close()
        print("Connection closed.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Replace these values with your actual router information
    router_hostname = "192.168.8.100"
    router_port = 22  # Default SSH port is 22
    router_username = "admin"
    router_password = "123"

    # Specify the command to show interface information
    show_interfaces_command = "show ip interface br"

    connect_to_router(router_hostname, router_port, router_username, router_password, show_interfaces_command)
