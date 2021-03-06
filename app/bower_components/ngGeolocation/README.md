# ngGeolocation

###### AngularJS support for [HTML5 Geolocation API](http://www.w3.org/TR/geolocation-API/)

[![Build Status](https://travis-ci.org/ninjatronic/ngGeolocation.png)](https://travis-ci.org/ninjatronic/ngGeolocation)

**ngGeolocation** provides AngularJS support for the [HTML5 Geolocation API](http://www.w3.org/TR/geolocation-API/). It aims to provide a quick and easy way to consume geolocation information made available by modern browsers and HTML5 in AngularJS apps wtihout having to write custom SDK wrapping code. Everything exposed by the `$geolocation` service lives within the digest cycle, so there is no need to use `$scope.$apply()` in your controllers when consuming the service. **ngGeolocation** goes one step further than wrapping the HTML5 API calls and provides a property that can be `$watch`ed by your controllers which will always contain the latest position data available through the browser.

[API Reference](https://github.com/ninjatronic/ngGeolocation/wiki/API-Reference)

## Installation

### Bower

The bower package name is `ngGeolocation`.

#### via `bower.json`

```javascript
{
    "dependencies": {
        "ngGeolocation": ">=0.0.2"
    }
}
```

#### via CLI

```
bower install ngGeolocation
```

Include the installed scripts in your html...

```html
<script src="bower_components/ngGeolocation.min.js"/>
```

### Manual

Download the [minified](https://github.com/ninjatronic/ngGeolocation/blob/v0.0.2/ngGeolocation.min.js) or [unminified](https://github.com/ninjatronic/ngGeolocation/blob/v0.0.2/ngGeolocation.js) source.

Include the scripts in your html...

```html
<script src="lib/ngGeolocation.min.js"/>
```

## Usage

Make sure your app depends on the `ngGeolocation` module. Geolocation methods are available through the `$geolocation` service.

```javascript
angular
    .module('Truq', ['ngGeolocation'])
    .controller('geolocCtrl', ['$geolocation', '$scope', function($geolocation, $scope) {
         $scope.myPosition = $geolocation.getCurrentPosition({
            timeout: 60000
         });
    }]);
```

The `$geolocation` service can expose a property `location` whose value reflects the current position. To enable this feature a watch must be created using `watchPosition`. This method takes a `PositionOptions` object in the same manner as `getCurrentPosition`. There is no return value.

While this watch is active the value of the property `location` is periodically updated with the latest geolocatopm result. If an error has occurred the code and message are available via `$geolocation.position.error`.

The current watch can be cancelled using `clearWatch`.

```javascript
angular
    .module('Truq', ['ngGeolocation'])
    .controller('geolocCtrl', ['$geolocation', '$scope', function($geolocation. $scope) {
        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        };
        $scope.myCoords = $geolocation.position.coords; // this is regularly updated
        $scope.myError = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
    }]);
```

## Development

This project uses Grunt for tooling. The toolbelt dependencies are managed by Grunt and the production code dependencies are managed by Bower. Fork the code and clone it into your workspace, then...

```
npm install
bower install --dev
```

Tests can be run manually with `grunt test` or automatically on changes with `grunt`.

If you wish to submit a pull request or an issue please include a test that demonstrates your addition.
