import { defineStore } from 'pinia';

// 关于pinia的使用文档可以参考 https://pinia.web3doc.top/core-concepts/#defining-a-store

export const useStore = defineStore('pinia', {
    state: () => {
        return{
            // 网站信息
            websiteInfo:{
                websiteName: "✨Pipi's Blog"
            },
            // 该对象中的数据保存在数据库中, 每次请求时从数据库中读取该数据.
            authorInfo:{
                name: '闪光皮皮',
                avator: 'images/avator.jpg',
            },
            // 网站首页用户各标签信息
            articlesInfo:{
                articleCount: 100000,
                tagsCount: 100000,
                categoryCount: 100000,
            },
            // 网站各个页面的背景图
            backgroundImg:{
                homeUrl: 'https://upload.linkstarted.top/config/690cd550b6f59b2613974a3804a01d42.jpg',
            },
            themeName: 'light',

        }
    },
    actions:{
        // 修改主题 白天 | 黑暗
        switchTheme(theme: boolean){
            if(theme) {
                this.themeName = 'light';
            }
            else{
                this.themeName = 'dark';
            }
        }
    }
})