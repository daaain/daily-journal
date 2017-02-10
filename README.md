# Daily journal app

This an offline-first journaling app, which I created as an experiment to help me keep up with my daily work journaling, but it’s of course open for anyone to use.

As you start writing, your journal will be saved locally in your browser (using PouchDB), so you can close the window and come back any time with everything saved.

In case you want to back up your data (and settings), you can export everything into a file and import back later. I’m also planning to integrate with Dropbox to make this smoother and enable synchronisation between devices.

TODO full tech stack

## Install dependencies

```sh
yarn install
```

## Run development server

```sh
yarn start
```

## Build for production

```sh
yarn build
```
