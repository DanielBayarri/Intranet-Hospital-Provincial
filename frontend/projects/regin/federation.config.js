const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'regin',

  exposes: {
    './Component': './projects/regin/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
     "primeng": {
      singleton: true,
      requiredVersion: false,
    },
    "primeicons": {
      singleton: true,
      requiredVersion: false,
    },
    "@angular/cdk": {
      singleton: true,
      requiredVersion: false,
    },
    "chart.js": {
      singleton: true,
      requiredVersion: false,
    },
  },
  

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
  
});