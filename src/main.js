const $siteList = $('.siteList')
const $lastLi = $siteList.find('.last')
const cache = localStorage.getItem('cache')
const history = JSON.parse(cache)
const sites = history || [
    {logo: 'M', url: 'https://developer.mozilla.org'},
    {logo: 'J', url: 'https://zh.javascript.info'},
    {logo: 'C', url: 'https://css-tricks.com'},
    {logo: 'W', url: 'https://wangdoc.com/javascript/index.html'},
    {logo: 'E', url: 'https://es6.ruanyifeng.com/'},
    {logo: 'V', url: 'https://cn.vuejs.org/v2/guide/'},
]

const removePrefix = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}

const saveToCache = () => {
    localStorage.setItem('cache', JSON.stringify(sites))
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    sites.forEach((item, index) => {
        const $site = $(`
                <li>
                    <div class="site">
                        <div class="logo">${item.logo}</div>
                        <div class="link">${removePrefix(item.url)}</div>
                        <div class="delete">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                </li>
        `).insertBefore($lastLi)
        $site.on('click', () => {
            open(item.url)
        })
        $site.on('click', '.delete', (e) => {
            e.stopPropagation()
            if (window.confirm('是否确认删除？')) {
                sites.splice(index, 1)
                saveToCache()
                render()
            }
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入新标签页的网址：')
    if (url === '') {
        window.alert('网址不可为空！')
    } else if (url) {
        if (!url.includes('http')) {
            url = 'https://' + url
        }
        console.log(url)
    
        sites.push({logo: removePrefix(url)[0].toUpperCase(), url: url})
        saveToCache()
        render()
    }
})