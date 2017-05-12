const values = require('~/values')
const frameModule = require('ui/frame')
const topmost = frameModule.topmost()
const application = require('application')
const utils = require('utils/utils')

let num
let phone
let key

exports.pageLoaded = function (args) {
  const page = args.object
  phone = page.getViewById('phone')
  key = page.getViewById('key')
  num = page.navigationContext
  if (!phone.text) {
    phone.focus()
  } else {
    key.focus()
  }
  phone.on('longpress', function () {
    const intent = new android.content.Intent(android.content.Intent.ACTION_PICK, android.net.Uri.parse("content://contacts"))
    intent.setType(android.provider.ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE)
    application.android.foregroundActivity.startActivityForResult(intent, 1)
    application.android.onActivityResult = function (requestCode, resultCode, data) {
      if (!data) {
        return
      }
      const contactUri = data.getData()
      const projection = [android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER]
      const cursor = utils.ad.getApplicationContext().getContentResolver().query(contactUri, projection, null, null, null)
      cursor.moveToFirst()
      const column = cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER)
      const number = cursor.getString(column)
      phone.text = number
      return
    }
  })
}
exports.save = function () {
  values.setNumber(num, phone.text)
  values.setKey(num, key.text)
  topmost.goBack()
}
