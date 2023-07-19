import router from '@/router';
import { defineStore } from 'pinia';

// 关于pinia的使用文档可以参考 https://pinia.web3doc.top/core-concepts/#defining-a-store

export const useStore = defineStore('pinia', {
    state: () => {
        return {
            // 网站信息
            websiteInfo: {
                websiteName: "✨Pipi's Blog",
                blogsCount: 0,
                collectionCount: 0,
                categoryCount: 0,
            },
            authorInfo: {
                name: '闪光皮皮',
                avatar: 'images/avatar.jpg',
            },
            userInfo: {
                id: -1,
                name: 'null',
                avatar: '',
                email: '',
            },
            // 网站各个页面的背景图
            backgroundImg: {
                homeUrl: 'images/header-cover.jpg',
            },
            themeName: 'light',
            showLoginModal: false,
            showChangeInfo: false,
            showSearch: false,
        }
    },
    persist:{
        storage: sessionStorage,
        paths: ['userInfo', 'themeName']
    },
    actions: {
        // 修改主题 白天 | 黑暗
        switchTheme(theme: boolean) {
            if (theme) {
                this.themeName = 'light';
            }
            else {
                this.themeName = 'dark';
            }
        },
        // 设置网站数据
        setWebsiteInfo(blogsCount: number, collectionCount: number, categoryCount: number) {
            this.websiteInfo.blogsCount = blogsCount;
            this.websiteInfo.collectionCount = collectionCount;
            this.websiteInfo.categoryCount = categoryCount;
        },
        // 显示登录框
        showLoginBox(key: boolean) {
            this.showLoginModal = key;
        },
        // 设置用户信息
        setUserInfo(id: number, name: string, email: string, avatar: string) {
            this.userInfo.id = id;
            this.userInfo.name = name;
            this.userInfo.email = email;
            this.userInfo.avatar = avatar;
        },
        // 是否显示修改用户信息界面
        setIsShowChangeInfo(key: boolean) {
            this.showChangeInfo = key;
        },
        // 退出登录
        exit() {
            this.setUserInfo(-1, '', '', '');
            router.replace({
                path: '/'
            })
        },
    },
})