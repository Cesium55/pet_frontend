import { authFetch } from "./auth";
import config from "./config";

async function get_categories_sub_info() {
    const response = await authFetch(config.interval_repeat_url + "/groups/")

    if (response.ok) {
        const response_json = await response.json()
        console.log(response_json)
        return response_json.data
    }
    return []

}


async function get_instances_to_learn(entity_name) {
    const ir_response = await authFetch(config.ir_instances_to_learn_prefix + "/" + entity_name)
    if (ir_response.ok) {
        const ir_data = await ir_response.json()
        return ir_data
    }
    console.log(ir_response)

}


export { get_categories_sub_info, get_instances_to_learn }