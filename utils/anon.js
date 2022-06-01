
const pseudoAnon = (fields, body, anon) => {
     if (anon === false) {
          return body;
     }
     fields.forEach((field) => {
          if (Array.isArray(body)) {
               body.forEach((item) => {
                    if (item[field]) {
                         item[field] = sensure(item[field])
                    }
               });
               return undefined;
          }
          body[field] = sensure(doby[field]);
     })
     return body
}

const sensure = (value) => {
     value = value.toString();
     return value.substring(0, Math.round(value.length * 0.25)).split('').map(() => '*').join('') + value.substring(Math.round(value.length * 0.25), Math.round(value.length * 0.75)) + value.substring(Math.round(value.length * 0.75)).split('').map(() => '*').join('')
}

module.exports = pseudoAnon;