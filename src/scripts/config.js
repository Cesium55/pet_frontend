const auth_prefix = import.meta.env.VITE_AUTH_URL + "/api/v1/web"
const words_prefix = import.meta.env.VITE_WORDS_URL


export default {
    login_url: auth_prefix + "/login",
    register_url: auth_prefix + "/register",
    refresh_token_url: auth_prefix + "/refresh",
    auth_url: auth_prefix + "/auth",
    logout_url: auth_prefix + "/logout",
    words_categories_all_url: words_prefix + "/categories",
}