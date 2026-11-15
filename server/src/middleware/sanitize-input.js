import {body} from 'express-validator';

export function sanitizeTextFields(...fields) {
  return fields.map((field) => body(field).optional({values: 'null'}).trim());
}
