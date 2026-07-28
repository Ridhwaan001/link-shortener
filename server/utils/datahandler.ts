import { DatabaseSync } from "node:sqlite";

export const database = new DatabaseSync(`./linkdata.db`);

const createInstruction = `
CREATE TABLE IF NOT EXISTS links (
  code TEXT PRIMARY KEY,
  created INTEGER,
  link TEXT
  );
  
  `;

export interface shortLink {
  code: string;
  created: number;
  link: string;
}

database.exec(createInstruction);

export const addLink = database.prepare(`
    INSERT INTO links (code, created, link)
    VALUES (?, ?, ?);
`);

export const removeLink = database.prepare(`
    DELETE FROM links WHERE code = ?
    `);

export const getLink = database.prepare(`
    SELECT * FROM links WHERE code = ?
    `);

export const getAll = database.prepare(`SELECT * FROM links`);

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
