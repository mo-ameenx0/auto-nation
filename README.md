# AutoNation

# Router Setup

To be able to use the AutoNation application the router need to be setuped to accept
SSH connection. Write the following configurations into the router and change
the necessary values.

1. Configure the interface that is connected to the network

   ```
   Router(config)#interface f0/0
   Router(config-if)#ip add <IP_ADDRESS> <NETWORK_SUBNET>
   Router(config-if)#no shutdown
   ```

2. Configure a hostname for the router

   ```
   Router(config)#hostname <ROUTER_NAME>
   ```

3. Configure a domain name

   ```
   Router(config)#ip domain-name <DOMAIN_NAME>
   ```

4. Generate the RSA keypair

   ```
   Router(config)#crypto key generate rsa general-keys modulus 2048
   ```

5. Switch to SSH version 2

   ```
   Router(config)#ip ssh version 2
   ```

6. Create a username and password in the router

   ```
   Router(config)#username <USERNAME> privilege 15 secret <PASSWORD>
   ```

7. Configure VTY lines to use SSH only

   ```
   Router(config)#line vty 0 4
   Router(config-line)#transport input ssh
   Router(config-line)#login local
   ```

8. Verify configurations

   ```
   Router(config)#do show running-config
   ```

9. Connect to the router using putty or OpenSSH to confirm the ssh is setuped correctly

   ```
   ssh -o Ciphers=aes256-cbc -o HostKeyAlgorithms=+ssh-rsa -o PubkeyAcceptedAlgorithms=+ssh-rsa -oKexAlgorithms=+diffie-hellman-group1-sha1 <USERNAME>@<ROUTER_IP>
   ```

# Application Build Steps

**_Note: the application was developed using linux operating system_**

To build the application and install into your system follow the steps:

1. Open a terminal and then go to the project folder

2. Build the python package.
   ```
   ~$ python -m build
   ```

# Application Development Steps

**_Note: the application was developed using linux operating system_**

To start developing and testing the application follow the steps:

1. Create a python virtual enviroment

   ```
   ~$ python -m venv .venv
   ```

2. Activate the virtual enviroment

   ```
   ~$ source .venv/bin/activate
   ```

3. Install the package into the virtual enviroment

   ```
   ~$ pip install --editable .
   ```

4. Install requried packages

   ```
   ~$ pip install -r requirements.txt
   ```

5. Run the AutoNation application and start the development
   ```
   ~$ AutoNationGUI
   ```
