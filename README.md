# Demae

## How to use

### Using 

```bash
git clone git@github.com:1amageek/Demae.git
```


### Setup

Set up firebase:

- install Firebase Tools: `npm i -g firebase-tools`
- create a project through the [firebase web console](https://console.firebase.google.com/)
- grab the projects ID from the web consoles URL: https://console.firebase.google.com/project/<projectId>
- update the `.firebaserc` default project ID to the newly created project
- login to the Firebase CLI tool with `firebase login`
- overwrite `src/app/config/development.config.json` and `production.config.json`
- `clasp clone --rootDir ./src ${script_id}`
  
```JOSN:development.config.json
{
	"apiKey": "",
	"authDomain": "",
	"databaseURL": "",
	"projectId": "",
	"storageBucket": "",
	"messagingSenderId": "",
	"appId": ""
}
```

```JSON:.clasp.json
{
	"scriptId": "",
	"rootDir": "./src/gas"
}
```

#### Install project:

```bash
npm install
```

#### Run Next.js development:

```bash
npm run dev
```

#### Run Firebase locally for testing:

```
npm run serve
```

#### Deploy it to the cloud with Firebase:

```bash
npm run deploy
```

#### Clean dist folder

```bash
npm run clean
```

## Architecture

### Database

#### Commerce

```
/commerce/v1/accounts/:uid
```

```
/commerce/v1/accounts/:uid/products/:product_id
```

```
/commerce/v1/accounts/:uid/products/:product_id/skus/:sku_id
```

```
/commerce/v1/accounts/:uid/orders/:order_id
```

#### Social

```
/social/v1/users/:uid
```

```
/social/v1/users/:uid/orders/:order_id
```


### GAS


## The idea behind the example

The goal is to host the Next.js app on Firebase Cloud Functions with Firebase Hosting rewrite rules so our app is served from our Firebase Hosting URL, with a complete Typescript stack for both the Next app and for the Firebase Functions. Each individual `page` bundle is served in a new call to the Cloud Function which performs the initial server render.

This is based off of the work of @jthegedus in the [with-firebase-hosting](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting) example.

If you're having issues, feel free to tag @sampsonjoliver in the [issue you create on the next.js repo](https://github.com/zeit/next.js/issues/new)

## Important

- The empty `placeholder.html` file is so Firebase Hosting does not error on an empty `public/` folder and still hosts at the Firebase project URL.
- `firebase.json` outlines the catchall rewrite rule for our Cloud Function.
- The [Firebase predeploy](https://firebase.google.com/docs/cli/#predeploy_and_postdeploy_hooks) hooks defined in `firebase.json` will handle linting and compiling of the next app and the functions sourceswhen `firebase deploy` is invoked. The only scripts you should need are `dev`, `clean` and `deploy`.
- Specifying [`"engines": {"node": "8"}`](package.json#L5-L7) in the `package.json` is required for firebase functions
  to be deployed on Node 8 rather than Node 6
  ([Firebase Blog Announcement](https://firebase.googleblog.com/2018/08/cloud-functions-for-firebase-config-node-8-timeout-memory-region.html))
  . This is matched in by specifying target as `es2017` in [`src/functions/tsconfig.json`](src/functions/tsconfig) so that typescript output somewhat compacter and moderner code.
