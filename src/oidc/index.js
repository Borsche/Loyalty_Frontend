const settings = {
    issuer: 'https://id.twitch.tv/oauth2/',
    claims: 'claims={"id_token":{"picture":null},"userinfo":{"picture":null}}',
    response_type: 'id_token+token',
    scope: 'openid',
    redirect_uri: 'http://localhost:8082/auth/signinwin/home',
    client_id: '86dn54lk93xa00ezi86xcsc8eewz8r'
}

function authorize() {
    oidc.state = generateId()
    oidc.nonce = generateId()

    window.localStorage.setItem('state', oidc.state)
    window.localStorage.setItem('nonce', oidc.state)

    const query =
        `?response_type=${oidc.settings.response_type}` +
        `&client_id=${oidc.settings.client_id}` +
        `&redirect_uri=${oidc.settings.redirect_uri}` +
        `&claims=${oidc.settings.claims}` +
        `&scope=${oidc.settings.scope}` +
        `&state=${oidc.state}` +
        `&nonce=${oidc.nonce}`

    window.location.href = oidc.settings.issuer + 'authorize' + query
}

function validate() {}

function getUserInfo() {}

const oidc = {
    settings,
    state: window.localStorage.getItem('state'),
    nonce: window.localStorage.getItem('nonce'),
    authorize,
    validate,
    getUserInfo
}

/**
 * HELPER FUNCTIONS
 */
function dec2hex(dec) {
    return dec.toString(16).padStart(2, '0')
}

function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
}

export default oidc
