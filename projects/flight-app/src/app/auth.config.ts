import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {
 
    // Wo ist der Auth-Server
    issuer: 'https://steyer-identity-server.azurewebsites.net/identity',

    // Wer bin ich?
    redirectUri: window.location.origin + '/index.html',
    clientId: 'spa-demo',
    
    // Was will ich?
    scope: 'openid profile email voucher',
    //             Identity     | Access
    //             ID_Token     | Access_Token
    //             OIDC         | Custom

}