import path from 'path'
export function fileHandler(req, callback) {
  let requestedPath = req.url

  const url = req.url.substr(7)
//   console.log('url', url)
//   console.log('norm', path.normalize(`${__dirname}/${url}`))
//   // callback({ path: path.normalize(`${__dirname}/${url}`) })
//   console.log('req', requestedPath)
//   console.log('dir', `${__dirname}`)
//   console.log(
//     'relative',
//     path.relative(path.resolve(`${__dirname}`), path.normalize(url))
//   )
  callback({
    path: path.normalize(url),
  })
} 

export function UpsertKeyValue(obj, keyToChange, value) {
  const keyToChangeLower = keyToChange.toLowerCase()
  for (const key of Object.keys(obj)) {
    if (key.toLowerCase() === keyToChangeLower) {
      // Reassign old key
      obj[key] = value
      // Done
      return
    }
  }
  // Insert at end instead
  obj[keyToChange] = value
}