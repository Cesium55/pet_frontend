import { authFetch } from "./auth";
import config from "./config";

async function get_categories_sub_info() {
    const response = await authFetch(config.interval_repeat_url + "/groups")

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

async function get_instances_to_repeat(entity_name) {
    const ir_response = await authFetch(config.ir_instances_to_repeat_url + "/" + entity_name)
    if (ir_response.ok) {
        const ir_data = await ir_response.json()
        return ir_data
    }
    console.log(ir_response)
}

async function mark_as_known(entity_type, instance_id) {
    const ir_response = await authFetch(config.ir_mark_as_known_url, { method: "post", body: JSON.stringify({ instance_id: instance_id, entity_type: entity_type }) })
    if (ir_response.ok) {
        const ir_data = await ir_response.json()
        return ir_data
    }
    console.log(ir_response)
}
async function start_learning(entity_type, instance_id) {
    const ir_response = await authFetch(config.ir_start_learning_url, { method: "post", body: JSON.stringify({ instance_id: instance_id, entity_type: entity_type }) })
    if (ir_response.ok) {
        const ir_data = await ir_response.json()
        return ir_data
    }
    console.log(ir_response)
}


async function repeat(entity_type, instance_id, remembered_status) {
    const ir_response = await authFetch(config.ir_repeat_url, { method: "put", body: JSON.stringify({ instance_id: instance_id, entity_type: entity_type, remembered_status: remembered_status }) })
    if (ir_response.ok) {
        const ir_data = await ir_response.json()
        return ir_data
    }
    console.log(ir_response)
}




async function get_ir_stats() {
    const ir_response = await authFetch(config.interval_repeat_url + "/stats")
    console.log(ir_response)
    if (ir_response.ok) {
        const ir_data = await ir_response.json()
        return ir_data
    }

}



async function get_next_repeat_relation(entity_type) {
    const ir_response = await authFetch(config.ir_get_next_repeat_relation_url + "/" + entity_type)
    console.log(ir_response)
    if (ir_response.ok) {
        const ir_data = await ir_response.json()
        return ir_data
    }

}


function getNextRepeatMessage(utcString) {
    // Удаляем лишние микросекунды (оставляем только 3 цифры после точки)
    const cleanedStr = utcString.replace(/(\.\d{3})\d+/, '$1');

    // Парсим как UTC
    const targetDate = new Date(cleanedStr + 'Z');
    const nowUtc = new Date();

    const diffMs = targetDate.getTime() - nowUtc.getTime();

    if (isNaN(targetDate.getTime())) {
        return "Invalid date format";
    }

    if (diffMs <= 0) {
        return "Next repeat is now or already passed";
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);

    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

    return `Next repeat in ${parts.join(' ')}`;
}



async function get_next_repeat_description(entity_type){
    const data = (await get_next_repeat_relation(entity_type)).data
    if (data && data.next_repeat_time) {
        return getNextRepeatMessage(data.next_repeat_time)
    }
    return "Nothing to repeat"

}


export {
    get_next_repeat_relation,
    get_categories_sub_info,
    get_instances_to_learn,
    mark_as_known,
    get_ir_stats,
    start_learning,
    repeat,
    get_instances_to_repeat,
    get_next_repeat_description,
}