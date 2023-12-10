import socket

def validate_ip_address(ip):
    try:
        socket.inet_pton(socket.AF_INET, ip)  # Check for IPv4
        return True
    except socket.error:
        return False
