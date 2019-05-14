export const guid = function() {
    function digit4string() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return digit4string() + digit4string() + '-' + digit4string() + "-" + digit4string() + "-" + digit4string() + digit4string();
}