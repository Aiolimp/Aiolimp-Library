export default function del (target, key) {
    if (Array.isArray(target)) {
        target.splice(key, 1)
        return
    }

    const ob = target.__ob__

    if (!(key in target)) return

    delete target[key]

    if (!ob) return

    ob.dep.notify()
}
