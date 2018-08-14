const fs = require('fs')
const SpacebroClient = require('spacebro-client').SpacebroClient
var standardSettings = require('standard-settings')
var assignment = require('assignment')
var settings = standardSettings.getSettings()

var spacebroClient = new SpacebroClient()

var allowAccess = function (path) {
  return path && path.startsWith(settings.folder.settings)
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

spacebroClient.on(settings.service.spacebro.client.in.patchSettings.eventName, function (data, callback) {
  console.log('write to file:' + data)
  if (!allowAccess(data.path)) {
    data.error = 'Can not access this settings file, check settings-bro settings.folder.settings'
    console.log('Error: ' + data.error)
    if (typeof callback === 'function') {
      callback(data)
    }
    return
  }
  fs.readFile(data.path, 'utf-8', (err, content) => {
    if (err) {
      console.log('An error ocurred reading the file :' + err.message)
      data.error = err.message
      content = {}
    } else {
      content = JSON.parse(content)
    }

    try {
      data.content = JSON.parse(data.content)
    } catch (e) {
    }
    content = assignment(content, data.content)

    fs.writeFile(data.path, JSON.stringify(content, null, 2), (error) => {
      if (error) {
        data.error = error.message
      } else {
        console.log('Success writing the file :' + data.path)
      }

      if (typeof callback === 'function') {
        callback(data)
      }
    })
  })
})
