import PouchDB from "pouchdb"

import { isClient } from "./env"
import replicationStream from "pouchdb-replication-stream"
import memoryAdapter from "pouchdb-adapter-memory"
import MemoryStream from "memorystream"
import FileSaver from "file-saver"

const pouchInitArgs = ['journal'];

if (!isClient) {
  PouchDB.plugin(memoryAdapter);
  pouchInitArgs.push({adapter: 'memory'});
}

export const database = new PouchDB(...pouchInitArgs);

export function destroyDatabase() {
  database.destroy();
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
    FileSaver.saveAs(blob, "journal_db.json");
  }).catch(function (err) {
    console.log('PouchDB dump error:', err);
  });
}
