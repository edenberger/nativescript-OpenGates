const application = require('application')
const values = require('~/values')
function dial (telNum) {
  const intent = new android.content.Intent(android.content.Intent.ACTION_CALL, android.net.Uri.parse('tel:' + telNum))
  intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
  application.android.context.startActivity(intent)
  return true
}
android.content.BroadcastReceiver.extend('com.tns.broadcastreceivers.SmsEventReceiver', {
  onReceive: function (context, intent) {
    let message
    const messages = intent.getSerializableExtra('pdus')
    const format = intent.getStringExtra('format')
    for (let i = 0; i < messages.length; i++) {
      message = android.telephony.SmsMessage.createFromPdu(messages[i], format)
    }
    switch (message.getMessageBody()) {
      case values.getKey('1'):
      case (values.getKey('1') + ' '):
        dial(values.getNumber('1'))
        break
      case values.getKey('2'):
      case (values.getKey('2') + ' '):
        dial(values.getNumber('2'))
        break
      case values.getKey('3'):
      case (values.getKey('3') + ' '):
        dial(values.getNumber('3'))
        break
    }
  }
})
