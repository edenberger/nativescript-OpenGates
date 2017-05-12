const applicationSettings = require('application-settings')

if (!applicationSettings.getString('Image')) {
  applicationSettings.setString('Image', '~/Images/green.png')
}
if (!applicationSettings.getString('Number1')) {
  applicationSettings.setString('Number1', '050-000-000')
}
if (!applicationSettings.getString('Number2')) {
  applicationSettings.setString('Number2', '050-000-000')
}
if (!applicationSettings.getString('Number3')) {
  applicationSettings.setString('Number3', '050-000-000')
}
if (!applicationSettings.getString('Key1')) {
  applicationSettings.setString('Key1', 'Front')
}
if (!applicationSettings.getString('Key2')) {
  applicationSettings.setString('Key2', 'Back')
}
if (!applicationSettings.getString('Key3')) {
  applicationSettings.setString('Key3', 'North')
}

exports.getImage = function () {
  return applicationSettings.getString('Image')
}
exports.getNumber = function (num) {
  return applicationSettings.getString('Number' + num)
}
exports.getKey = function (num) {
  return applicationSettings.getString('Key' + num)
}

exports.setImage = function (image) {
  applicationSettings.setString('Image', image)
}
exports.setNumber = function (num, phoneNumber) {
  applicationSettings.setString('Number' + num, phoneNumber)
}
exports.setKey = function (num, key) {
  applicationSettings.setString('Key' + num, key)
}
