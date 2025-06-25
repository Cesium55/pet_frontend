const auth_prefix = import.meta.env.VITE_AUTH_URL + "/api/v1/web"
const words_prefix = import.meta.env.VITE_WORDS_URL
const media_handler_prefix = import.meta.env.VITE_MEDIA_HANDLER_URL + "/api/v1"
const s3_prefix = import.meta.env.VITE_S3_PREFIX
const s3_bucket = import.meta.env.VITE_S3_BUCKET



export default {
    login_url: auth_prefix + "/login",
    register_url: auth_prefix + "/register",
    refresh_token_url: auth_prefix + "/refresh",
    auth_url: auth_prefix + "/auth",
    logout_url: auth_prefix + "/logout",
    words_categories_all_url: words_prefix + "/categories",
    words_by_category_url: (category_id) => words_prefix + "/categories/" + category_id + "/words",
    s3_prefix: s3_prefix,
    s3_bucket: s3_bucket,
    media_handler_prefix: media_handler_prefix
}