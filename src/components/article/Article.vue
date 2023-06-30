<template>
    <div class="article">

    </div>
</template>

<script lang='ts' setup>

</script>

<style lang="less" scoped>
.article {
    height: 100%;
    width: 100%;
    background-color: var(--theme-background);

    .article-meta-data-wrap {
        display: flex;
        justify-content: center;
    }

    .article-meta-data {
        font-size: 14px;
        color: white;
        box-sizing: border-box;
        line-height: 24px;
        overflow: hidden;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .article-meta-data-divider {
        color: white;
        margin: 3px 8px;
        font-size: 14px;
    }

    .container {
        display: flex;

        .comment-card {
            margin-top: 24px;
            background: var(--theme-card-color);
            border: 1px solid var(--theme-card-color);
            border-radius: 8px;
            box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        }

        .article-card {
            background: var(--theme-card-color);
            border: 1px solid var(--theme-card-color);
            border-radius: 8px;
            box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
        }

        @media (min-width: 760px) {
            padding: 16px 20% 16px 20%;

            .main {
                width: 75%;
            }

            .side {
                width: 25%;
            }
        }

        @media (max-width: 759px) {
            padding: 16px 8px 16px 8px;

            .main {
                width: 100%;
            }

            .side {
                display: none;
            }
        }

        .article-like {
            text-align: center;
            color: var(--theme-color);

            .like-active {
                background-color: #ff4d4f;
                color: white;
            }

            .like {
                color: white;
                background-color: #1890ff;
            }
        }

        hr {
            position: relative;
            margin: 40px auto;
            border: 2px dashed #d2ebfd;
            width: calc(100% - 4px);
        }

        .theme-card {
            margin-left: 20px;

            .theme-body {
                position: relative;
                text-align: center;

                p {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #19b1f5;
                }

                .left {
                    position: absolute;
                    left: 0;
                    font-size: 35px;
                }

                .right {
                    position: absolute;
                    right: 0;
                    font-size: 35px;
                }
            }
        }

        .sticky-layout {
            position: sticky;
            top: 20px;
            margin-left: 20px;
        }

        .article-signature {
            border: 1px solid #ddd;
            position: relative;
            overflow: hidden;
            margin: 30px 5px 10px 5px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            padding: 12px;
            transition: all 0.4s;

            &:hover {
                box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
                transform: translateY(-1px);
            }

            img {
                margin-left: 10px;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                transition: all 0.6s;

                &:hover {
                    transform: rotate(-360deg);
                }
            }

            .copyright {
                padding-left: 20px;

                .copyright-item {
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    line-height: 28px;
                    font-size: 15px;
                    color: var(--theme-color);

                    a {
                        color: #99a9bf;
                        transition: all 0.4s;
                        cursor: pointer;

                        &:hover {
                            color: #19b1f5;
                        }
                    }

                    .copyright-title {
                        font-weight: bold;
                        color: #19b1f5;
                    }
                }
            }
        }

        .article-tags {
            padding-left: 3px;
            margin-top: 20px;
            color: var(--theme-color);
            font-size: 15px;

            a {
                border-radius: 4px;
                font-size: 13px;
                padding: 3px 12px;
                text-decoration: none;
                transition: all 0.4s;
                background: #49b1f5;
                margin-right: 8px;
                color: white;
                display: inline-block;
            }
        }

        .previous-next-article {
            width: 100%;
            margin-top: 50px;
            overflow: hidden;
            background: black;
            display: flex;
            border-radius: 9px;

            .previous-article,
            .next-article {
                width: 50%;

                a {
                    height: 150px;
                    overflow: hidden;
                    display: block;
                    position: relative;

                    img {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        object-fit: cover;
                        opacity: 0.5;
                        transition: all 0.6s ease-in-out;

                        &:hover {
                            transform: scale(1.1);
                            opacity: 0.8;
                        }
                    }

                    .previous-article-info,
                    .next-article-info {
                        pointer-events: none;
                        position: absolute;
                        top: 50%;
                        width: 100%;
                        padding: 20px 40px;
                        transform: translate(0, -50%);
                        color: white;
                        line-height: 28px;
                        box-sizing: border-box;

                        .label {
                            font-size: 13px;
                        }

                        .title {
                            font-weight: 500;
                            font-size: 14px;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                    }

                    .next-article-info {
                        text-align: right;
                    }
                }
            }
        }

        .copyright {
            padding-left: 20px;

            .copyright-item {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                line-height: 28px;
                font-size: 15px;
                color: var(--text-color);

                a {
                    color: #99a9bf;
                    transition: all 0.4s;
                    cursor: pointer;

                    &:hover {
                        color: #19b1f5;
                    }
                }

                .copyright-title {
                    font-weight: bold;
                    color: #19b1f5;
                }
            }
        }

        .hot-article-item {
            display: flex;
            justify-content: center;
            align-content: center;
            padding: 8px 0;
        }

        .hot-article-thumbail-link {
            height: 58px;
            width: 58px;
            overflow: hidden;
        }

        .hot-article-thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.4s ease;
        }

        .hot-article-thumbnail:hover {
            transform: scale(1.1);
        }

        .hot-article-info {
            flex: 1;
            padding-left: 10px;
            word-break: break-all;
            display: inline-block;
            align-self: center;
            color: var(--theme-color);
        }

        .hot-article-title {
            color: var(--text-color);
            font-size: 13.5px;
            text-decoration: none;
            transition: color 0.4s;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 1.5;
            -webkit-line-clamp: 2;
        }

        .hot-article-title:hover {
            color: var(--theme-color);
        }

        .hot-article-meta-data {
            font-size: 12px;
            color: rgb(133, 133, 133);
            box-sizing: border-box;
            line-height: 24px;
            overflow: hidden;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }

        .hot-article-meta-data span {
            margin-left: 4%;
        }
    }

}
</style>
