import os
import paramiko
import asyncio

PORT = 'PORT'
USERNAME = 'USERNAME'
PASSWORD = 'PASSWORD'

class SSH_Client:
    _self = None

    def __new__(cls, *args, **kwargs):
        if cls._self is None:
            cls._self = super(TasksReader, cls).__new__(cls)
        return cls._self

    @staticmethod
    def connect(router_ip):
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        try:
            client.connect(
                router_ip,
                port=int(os.getenv(PORT)),
                username=os.getenv(USERNAME),
                password=os.getenv(PASSWORD)
            )
            return client
        except Exception as e:
            print(f'Error: {e}')

    @staticmethod
    async def exec_commands(ip, commands):
        client = await asyncio.to_thread(SSH_Client.connect, ip)

        stdout, stderr = [], []

        for command in commands:
            _, out, err = await asyncio.to_thread(client.exec_command, command)
            stdout.append(out.read().decode("utf-8").strip())
            stderr.append(err.read().decode("utf-8").strip())

        client.close()

        return stdout, stderr
