# React 19 demo application

### Table of contents
🏹️ [Goal](#-goal)  
🔧 [Local install](#-local-install)  
🚀 [Run](#-run)  
🗑️ [Uninstall](#-uninstall)  

## 🏹️  Goal
The goal of the work is to demonstrate possible architecture of a React 19 single-page application.
Application implements client-site rendering without dependencies and demonstrates the following functionality:
- routing with browser navigation back and forward
- list of entities with filter / sorting / pagination / highlight
- create / edit / delete an entity
- client validation on create / edit entity
- server validation on save / delete entity
- notifications
- modal dialog
- select control
- internationalisation
- switch light / dark theme

## 🔧  Local install

1️⃣  Clone the repository:
```shell
git clone https://github.com/a-bobkov/react-demo.git
```
2️⃣  Install dependencies:
```shell
cd react-demo && npm i
```
3️⃣  Install `mkcert`:

[mkcert](https://github.com/FiloSottile/mkcert) is a simple zero-config tool for making locally-trusted development certificates (don't be confused with self-signed certificates). The certificate is used for the demonstration to create a secure http server. Please find and use the [installation instruction](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation) for your operating system.

4️⃣  Create a new local CA [(Certificate Authority)](https://en.wikipedia.org/wiki/Certificate_authority), that is needed to issue and verify development certificates:

```shell
mkcert -install
```

5️⃣  Export the root CA location for Node.js so that a running Node.js could find it:

```shell
export NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem"
```

6️⃣  Generate locally-trusted development certificate, to be used by the secure http server:

```shell
mkdir certificate && cd certificate && mkcert localhost && cd ..
```

## 🚀  Run

1️⃣  Run API-server:
```shell
node server/adm-server.js &
```

2️⃣  Run application server:
```shell
npm run build && npm run preview
```
3️⃣  Run client in a browser:

[https://localhost:4173](https://localhost:4173)

## 🗑️  Uninstall

1️⃣  Stop application server with Ctrl+C.

2️⃣  Stop API-server:
```shell
kill -9 $(pgrep -f 'server/adm-server.js')
```
3️⃣  Delete repo:
```shell
cd ..  && rm -rf react-demo
```