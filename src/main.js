const $siteList = $('.siteList')
const $lastLi = $siteList.find('.last')
const cache = localStorage.getItem('cache')
const history = JSON.parse(cache)
const sites = history || [
    {logo: 'M', url: 'https://developer.mozilla.org'},
    {logo: 'J', url: 'https://zh.javascript.info'},
    {logo: 'C', url: 'https://css-tricks.com'},
]

const render = () => {
    $siteList.find('li:not(.last)').remove()
    sites.forEach(item => {
        const $site = $(`
                <li>
                    <a href="${item.url}">
                        <div class="site">
                            <div class="logo">${item.logo}</div>
                            <div class="link">${item.url}</div>
                        </div>
                    </a>
                </li>
        `).insertBefore($lastLi)
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入新标签页的网址：')
    if (!url.includes('http')) {
        url = 'https://' + url
    }
    console.log(url)

    sites.push({logo: url[0].toUpperCase(), url: url})
    const sitesStr = JSON.stringify(sites)
    localStorage.setItem('cache', sitesStr)
    render()
})