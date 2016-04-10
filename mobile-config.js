App.info({
  name: 'RJ',
  description: "L'application officielle de la rencontre de jeunesse 2016 !",
  author: 'JS Tech',
  email: 'we@jstech.ch',
  website: 'http://rencontredejeunesse.ch',
  version: '0.0.1'
});

App.setPreference('Orientation', 'portait');

// App.icons({
//   'iphone_2x': 'resources/icons/icon-60@2x.png'
//   'iphone_2x': '120x120'
//   'iphone_3x': '180x180'
//   'ipad': '76x76'
//   'ipad_2x': '152x152'
//   'ipad_pro': '167x167'
//   'ios_settings': '29x29'
//   'ios_settings_2x': '58x58'
//   'ios_settings_3x': '87x87'
//   'ios_spotlight': '40x40'
//   'ios_spotlight_2x': '80x80'
//   'android_mdpi': '48x48'
//   'android_hdpi': '72x72'
//   'android_xhdpi': '96x96'
//   'android_xxhdpi': '144x144'
//   'android_xxxhdpi': '192x192'
// });

App.launchScreens({
  'iphone_2x': 'resources/screens/640x960.png'
  'iphone5': 'resources/screens/640x1136.png'
  'iphone6': 'resources/screens/750x1334.png'
  'iphone6p_portrait': 'resources/screens/1242x2208.png'
  'iphone6p_landscape': 'resources/screens/2208x1242.png'
  'ipad_portrait': 'resources/screens/768x1024.png'
  'ipad_portrait_2x': 'resources/screens/1536x2048.png'
  'ipad_landscape': 'resources/screens/1024x768.png'
  'ipad_landscape_2x': 'resources/screens/2048x1536.png'
  'android_mdpi_portrait': 'resources/screens/320x470.png'
  'android_mdpi_landscape': 'resources/screens/470x320.png'
  'android_hdpi_portrait': 'resources/screens/480x640.png'
  'android_hdpi_landscape': 'resources/screens/640x480.png'
  'android_xhdpi_portrait': 'resources/screens/720x960.png'
  'android_xhdpi_landscape': 'resources/screens/960x720.png'
  'android_xxhdpi_portrait': 'resources/screens/1080x1440.png'
  'android_xxhdpi_landscape': 'resources/screens/1440x1080.png'
});
