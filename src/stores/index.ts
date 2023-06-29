import { defineStore } from 'pinia';

// 关于pinia的使用文档可以参考 https://pinia.web3doc.top/core-concepts/#defining-a-store

export const useStore = defineStore('pinia', {
    state: () => {
        return{
            websiteInfo:{
                websiteName: "Pipi's Blog"
            },
            themeName: 'light',

        }
    }
})