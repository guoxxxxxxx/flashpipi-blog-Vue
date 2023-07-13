import { defineStore } from 'pinia';

// 关于pinia的使用文档可以参考 https://pinia.web3doc.top/core-concepts/#defining-a-store

export const useStore = defineStore('pinia', {
    state: () => {
        return{
            // 网站信息
            websiteInfo:{
                websiteName: "✨Pipi's Blog",
                blogsCount: 0,
                collectionCount: 0,
                categoryCount: 0,
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
        },
        // 设置网站数据
        setWebsiteInfo(blogsCount:number, collectionCount:number, categoryCount:number){
            this.websiteInfo.blogsCount = blogsCount;
            this.websiteInfo.collectionCount = collectionCount;
            this.websiteInfo.categoryCount = categoryCount;
        }
    }
})