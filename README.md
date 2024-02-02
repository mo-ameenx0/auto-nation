# AutoNation

AutoNation is an application for network tasks automation.

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

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
