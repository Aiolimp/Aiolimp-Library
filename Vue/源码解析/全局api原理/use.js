export default function use (plugin) {
    const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
        return this
    }

    const args = toArray(arguments, 1); // 获取参数
    args.unshift(this); //在参数中增加Vue构造函数

    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
        plugin.apply(null, args)
    }

    installedPlugins.push(plugin)
    return this
}
