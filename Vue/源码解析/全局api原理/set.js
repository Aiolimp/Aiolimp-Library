export default function set(target, key, val) {
    if (Array.isArray(target)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }

    const ob = target.__ob__

    if (key in target && !(key in target.prototype) || !ob) {
        target[key] = val
        return val
    }

    defineReactive(target, key, val)
    return val
}
