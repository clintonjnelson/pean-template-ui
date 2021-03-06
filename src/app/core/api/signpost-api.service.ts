import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';


// List of Signpost API Routes used in the UI
const ROUTES = {
  // Auth
  login:  '/api/login',
  logout: '/api/logout',
  passwordResetEmail: '/api/passwordresetrequest?email=:email',
  passwordReset: '/api/resetpassword',

  // Admin
  adminGetUsers: '/api/users',
  adminUpdateSitemap: '/api/tasks/sitemap',
  adminUserCleanup: '/api/tasks/cleanupusers',

  // Users
  createUser:  '/api/users',
  confirmUser: '/api/auth/emailconfirmation?confirmationtoken=:confirmationtoken&email=:email',
  resendUserConfirmation: '/api/auth/resendconfirmation?id=:userId',
  getUserById: '/api/users/:usernameOrId',
  getUsernameByUserId: '/api/users/:id/username',
  updateUser:  '/api/users/:id',
  checkAvailability: '/api/users/available?username=:username&email=:email',

  // Signs
  getSignsByUsernameOrId: '/api/signs/:usernameOrId',
  createSign:             '/api/signs',
  updateSign:             '/api/signs',
  updateSignOrder:        '/api/signs/order',
  destroySign:            '/api/signs',

  // Search
  search: '/api/search?searchStr=:searchStr',

  // Oauth Sign Links
  oauthAutoSign: {
    amazon:           '/api/auto/amazon',
    deviantart:       '/api/auto/deviantart',
    disqus:           '/api/auto/disqus',
    etsy:             '/api/auto/etsy',
    facebook:         '/api/auto/facebook',
    foursquare:       '/api/auto/foursquare',
    github:           '/api/auto/github',
    google:           '/api/auto/google',
    imgur:            '/api/auto/imgur',
    instagram:        '/api/auto/instagram',
    linkedin:         '/api/auto/linkedin',
    patreon:          '/api/auto/patreon',
    pinterest:        '/api/auto/pinterest',
    reddit:           '/api/auto/reddit',
    spotify:          '/api/auto/spotify',
    tumblr:           '/api/auto/tumblr',
    'stack-overflow': '/api/auto/stackexchange',
    twitter:          '/api/auto/twitter',
    vimeo:            '/api/auto/vimeo',
    vk:               '/api/auto/vkontakte',
    wordpress:        '/api/auto/wordpress',
    youtube:          '/api/auto/youtube',
  },

  // Log Interactions
  userPageVisit:    '/api/interactions/log/userpagevisit?guid=:guid&pageusername=:pageusername&userid=:userid',
  signLinkOff:      '/api/interactions/log/signlinkoff?guid=:guid&signid=:signid&signicon=:signicon&userid=:userid',

  // Interactions Data
  getUserPageInteractions:    '/api/interactions/dashboards/userpagevisit',
  getSignLinkOffInteractions: '/api/interactions/dashboards/signlinkoff',

  // social sharing
  'social-twitter': 'http://twitter.com/share?text=:text&url=:url&hashtags=:hashtags',
  'social-google': 'https://plus.google.com/share?url=:url',
  'social-facebook': 'https://www.facebook.com/sharer/sharer.php?u=:url',
};


@Injectable()

export class SignpostApi {
  routes = ROUTES;


  // eat (encrypted authentication token) is required on some requests
  getEatAuthCookie() {
    return window.localStorage.getItem('eatAuthToken');
  }
  getHeaderWithEat(): Headers {
    return new Headers({'eat': this.getEatAuthCookie()});
  }
  getRequestOptionWithEatHeader() {
    return new RequestOptions({headers: this.getHeaderWithEat()});
  }

  buildUrl(routeName: string, substitutions: Object[]): string {
    const baseUrl = this.routes[routeName];
    // console.log("BASE URL IS: ", baseUrl);
    // console.log("subs IS: ", substitutions);
    // Runs each of the substitutions, returning the final URL
    return substitutions.reduce( (priorResult, currentSubstitution) => {
        const sub = Object.keys(currentSubstitution)[0];
        const val = currentSubstitution[sub];
        return priorResult.replace(sub, val);
      },
      baseUrl  // Initial value of string
    );
  }
}
