import { authFetch } from "./auth";
import config from "./config";


async function get_words_by_ids(ids) {
    const response = await authFetch(config.words_by_ids_url, { method: "POST", body: JSON.stringify({ ids: ids }) })
    if (response.ok){
        return await response.json()
    }
    console.log(response)
}

export {get_words_by_ids}