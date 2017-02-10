import PouchDB from "pouchdb"

import { isClient } from "./env"
import replicationStream from "pouchdb-replication-stream"
import databaseLoadPlugin from "pouchdb-load"
import memoryAdapter from "pouchdb-adapter-memory"
import MemoryStream from "memorystream"
import FileSaver from "file-saver"

const pouchInitArgs = ['journal'];

if (!isClient) {
  PouchDB.plugin(memoryAdapter);
  pouchInitArgs.push({adapter: 'memory'});
}

export const database = new PouchDB(...pouchInitArgs);

if (isClient) {
  // needed for PouchDB Inspector Chrome extension
  window.PouchDB = PouchDB;
}

export function destroyDatabase() {
  database.destroy();
  window.location.reload();
}

export function importDatabase(jsonData) {
  PouchDB.plugin(databaseLoadPlugin);
  database.load(jsonData).then(function () {
    console.log('PouchDB import successful!');
  }).catch(function (err) {
    console.error('PouchDB import error:', err);
  });
}

export function dumpDatabase() {
  PouchDB.plugin(replicationStream.plugin);
  PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

  var dumpedString = '';
  var stream = new MemoryStream();
  stream.on('data', function(chunk) {
    dumpedString += chunk.toString();
  });

  database.dump(stream).then(function () {
    const blob = new Blob([dumpedString], {type: "application/json;charset=utf-8"});
    FileSaver.saveAs(blob, `journal_db-${new Date().toISOString()}.json`);
  }).catch(function (err) {
    console.error('PouchDB dump error:', err);
  });
}
