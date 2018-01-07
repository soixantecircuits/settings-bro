const fs = require('fs')
const SpacebroClient = require('spacebro-client').SpacebroClient
var standardSettings = require('standard-settings')
var settings = standardSettings.getSettings()

var spacebroClient = new SpacebroClient()

var allowAccess = function (path) {
  return path.startsWith(settings.folder.settings)
}

spacebroClient.on(settings.service.spacebro.client.in.getSettings.eventName, function (data, callback) {
  console.log('get settings: ' + data)
  if (!allowAccess(data.path)) {
    data.error = 'Can not access this settings file, check settings-bro settings.folder.settings'
    if (typeof callback === 'function') {
      callback(data)
    }
  }
  fs.readFile(data.path, 'utf-8', (err, content) => {
    if (err) {
      console.log('An error ocurred reading the file :' + err.message)
      data.error = err.message
    }

    // console.log('The file content is : ' + content)
    data.content = content
    if (typeof callback === 'function') {
      callback(data)
    }
  })
})

spacebroClient.on(settings.service.spacebro.client.in.writeSettings.eventName, function (data, callback) {
  console.log('write to file:' + data)
  if (!allowAccess(data.path)) {
    data.error = 'Can not access this settings file, check settings-bro settings.folder.settings'
    if (typeof callback === 'function') {
      callback(data)
    }
  }
  fs.writeFile(data.path, data.content, (error) => {
    if (error) {
      data.error = error.message
    }

    if (typeof callback === 'function') {
      callback(data)
    }
  })
})
