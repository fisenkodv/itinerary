export class AppConfig {
  public static googlePlacesApiKey = 'AIzaSyBkxFjVilFXxTMLb6JxL2x-AGeCOLIRO1M';
  public static itineraryApiBaseUrl = '/api/v1';

  public static authTokenEndpoint = '/connect/token';
  public static authUserInfoEndpoint = '/connect/userinfo';
 
  public static identityInfo = {
    clientId: 'itineraryWebClient',
    grantType: 'password',
    scope: 'offline_access openid'
  }
}
