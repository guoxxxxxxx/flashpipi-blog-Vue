import { defineStore } from 'pinia';

// 关于pinia的使用文档可以参考 https://pinia.web3doc.top/core-concepts/#defining-a-store

export const useStore = defineStore('pinia', {
    state: () => {
        return{
            // 网站信息
            websiteInfo:{
                websiteName: "✨Pipi's Blog"
            },
            authorInfo:{
                name: '闪光皮皮',
                avator: 'images/avator.jpg',
            },
            // 网站各个页面的背景图
            backgroundImg:{
                homeUrl: 'images/header-cover.jpg',
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