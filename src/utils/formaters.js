function formatBold(text) {
    return text.replace(/#(.*?)#/g, '<strong class="mygreen">$1</strong>')
}

function formatClear(text) {
    return text.replace(/#(.*?)#/g, '$1')
}


export {formatBold, formatClear}