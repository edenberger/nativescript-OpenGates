const Observable = require('data/observable').Observable
const values = require('~/values')
const application = require('application')

function startListener () {
  const PackageManager = android.content.pm.PackageManager
  const pkg = application.android.context.getPackageManager()
  const componentName = new android.content.ComponentName(application.android.context.getPackageName(), 'com.tns.broadcastreceivers.SmsEventReceiver')
  pkg.setComponentEnabledSetting(componentName, PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.DONT_KILL_APP)
}
function stopListener () {
  const PackageManager = android.content.pm.PackageManager
  const pkg = application.android.context.getPackageManager()
  const componentName = new android.content.ComponentName(application.android.context.getPackageName(), 'com.tns.broadcastreceivers.SmsEventReceiver')
  pkg.setComponentEnabledSetting(componentName, PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                  PackageManager.DONT_KILL_APP)
}

function createViewModel (page) {
  const viewModel = new Observable()
  const image = page.getViewById('image')
  if (!image.src) {
    image.src = values.getImage()
  }

  image.on('tap, longpress', function () {
    if (image.src === '~/Images/green.png' || image.src === '~/Images/greenpressed.png') {
      image.src = '~/Images/greenpressed.png'
      image.animate({
        opacity: 0,
        duration: 400
      }).then(() => {
        values.setImage('~/Images/red.png')
        image.src = values.getImage()
        image.animate({
          opacity: 1,
          duration: 400
        })
      })
      startListener()
    } else {
      image.src = '~/Images/redpressed.png'
      image.animate({
        opacity: 0,
        duration: 400
      }).then(() => {
        values.setImage('~/Images/green.png')
        image.src = values.getImage()
        image.animate({
          opacity: 1,
          duration: 400
        })
      })
      stopListener()
    }
  })

  viewModel.number1 = values.getNumber('1')
  viewModel.number2 = values.getNumber('2')
  viewModel.number3 = values.getNumber('3')
  viewModel.key1 = values.getKey('1')
  viewModel.key2 = values.getKey('2')
  viewModel.key3 = values.getKey('3')

  viewModel.changeValues = function (args) {
    const frameModule = require('ui/frame')
    const topmost = frameModule.topmost()
    const navigationOptions = {
      moduleName: 'pages/settings/settings',
      context: String(args.object.id)
    }
    topmost.navigate(navigationOptions)
  }

  return viewModel
}

exports.createViewModel = createViewModel
