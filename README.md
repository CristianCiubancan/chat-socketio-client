<!-- ABOUT THE PROJECT -->
## About The Project

This project is consists of a very basic chat app, where you can create accounts find other users on the main page and start chatting with them.

[Live Preview](https://chat.happyoctopus.net/)


Features:
* Register
* Login
* Logout
* Upload and change profile pics
* Start chats
* Send and receive messages
* Live notifications
* Recover lost passwords
* Redis clustering
* Loadbalancing

This website features cookie authentication for security.



### Built With

Those are the frameworks/libraries used to build this website client.

* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Chakra-UI](https://chakra-ui.com/)
* [Formik](https://formik.org/)



<!-- GETTING STARTED -->
## Getting Started

In order to try this locally you you will need to also download and run the [server side](https://github.com/CristianCiubancan/chat-socketio-server).

### Prerequisites

To run this project you will need to do the following:
* yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CristianCiubancan/chat-socketio-client
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Enter your API in `.env.local`
   ```.env.local
   NEXT_PUBLIC_API_URL=YOUR_API_ENDPOINT
   ```
4. Run the client
   ```sh
   yarn dev
   ```
