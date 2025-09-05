const auth_prefix = import.meta.env.VITE_AUTH_URL + "/api/v1/web"
const words_prefix = import.meta.env.VITE_WORDS_URL
const media_handler_prefix = import.meta.env.VITE_MEDIA_HANDLER_URL + "/api/v1"
const s3_prefix = import.meta.env.VITE_S3_PREFIX
const s3_bucket = import.meta.env.VITE_S3_BUCKET
const interval_repeat_prefix = import.meta.env.VITE_IR_URL

const master_host = import.meta.env.VITE_MASTER_HOST



export default {
    master_host: master_host,
    login_url: auth_prefix + "/login",
    link_tg_url: auth_prefix + "/link-telegram",
    register_url: auth_prefix + "/register",
    refresh_token_url: auth_prefix + "/refresh",
    auth_url: auth_prefix + "/auth",
    logout_url: auth_prefix + "/logout",
    words_categories_all_url: words_prefix + "/categories/",
    words_by_category_url: (category_id) => words_prefix + "/categories/" + category_id + "/words",
    words_by_ids_url: words_prefix + "/words/by-ids",
    s3_prefix: s3_prefix,
    s3_bucket: s3_bucket,
    s3_url: s3_prefix + "/" + s3_bucket + "/",
    media_handler_prefix: media_handler_prefix,
    interval_repeat_prefix: interval_repeat_prefix,
    interval_repeat_url: interval_repeat_prefix + "/ir",
    ir_instances_to_learn_prefix: interval_repeat_prefix + "/ir/instances-to-learn",
    ir_mark_as_known_url: interval_repeat_prefix + "/ir/already-know",
    ir_start_learning_url: interval_repeat_prefix + "/ir/learn",
    ir_repeat_url: interval_repeat_prefix + "/ir/repeat",
    ir_instances_to_repeat_url: interval_repeat_prefix + "/ir/instances-to-repeat",
    ir_get_next_repeat_relation_url: interval_repeat_prefix + "/ir/get-next-repeat-relation",

    movie_get_url: (movie_id) => media_handler_prefix + "/videos/" + movie_id,
    clips_get_url: (movie_id) => media_handler_prefix + "/videos/" + movie_id + "/clips",
    get_clip_by_timing_url: (movie_id, timing) => media_handler_prefix + "/videos/" + movie_id + "/clip-by-timing?timing=" + timing

}