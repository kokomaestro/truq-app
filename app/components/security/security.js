(function (angular) {
  "use strict";

  // when $stateProvider.whenAuthenticated() is called, the path is stored in this list
  // to be used by authRequired() in the services below
  var securedRoutes = [];

  angular.module('Truq.security', ['firebase.auth', 'config'])

    .config(['$urlRouterProvider', function ($urlRouterProvider) {
      // routes which are not in our map are redirected to /home
          $urlRouterProvider.otherwise('/');
    }])

  /**
   * Adds a special `whenAuthenticated` method onto $stateProvider. This special method,
   * when called, waits for auth status to be resolved asynchronously, and then fails/redirects
   * if the user is not properly authenticated.
   *
   * The promise either resolves to the authenticated user object and makes it available to
   * dependency injection (see AuthCtrl), or rejects the promise if user is not logged in,
   * forcing a redirect to the /login page
   *
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
      // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
      // unfortunately, a decorator cannot be use here because they are not applied until after
      // the .config calls resolve, so they can't be used during route configuration, so we have
      // to hack it directly onto the $stateProvider object
          $urlRouterProvider.whenAuthenticated = function (path, route) {
        securedRoutes.push(path); // store all secured routes for use with authRequired() below
        route.resolve = route.resolve || {};
        route.resolve.user = ['Auth', function (Auth) {
          return Auth.$requireAuth();
        }];
              $urlRouterProvider.when(path, route);
        return this;
      }
    }])

  *
   * Apply some route security. Any route's resolve method can reject the promise with
   * { authRequired: true } to force a redirect. This method enforces that and also watches
   * for changes in auth status which might require us to navigate away from a path
   * that we can no longer view.
   */
    .run(['$rootScope', '$state', 'Auth', 'loginRedirectPath',
      function ($rootScope, $state, Auth, loginRedirectPath) {
        // watch for login status changes and redirect if appropriate

      }
    ]);

})(angular);
