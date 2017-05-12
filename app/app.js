const application = require('application')
const permissions = require('nativescript-permissions')
if (!permissions.hasPermission('RECEIVE_SMS')) {
  permissions.requestPermissions([android.Manifest.permission.RECEIVE_SMS, android.Manifest.permission.CALL_PHONE, android.Manifest.permission.WRITE_EXTERNAL_STORAGE])
}
application.cssFile = 'app.css'
application.start({ moduleName: 'pages/main-page/main-page' })
