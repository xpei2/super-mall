<template>
    <div class="profile-info">
        <div class="info-photo" @click="notClick">
            <img :src="profileInfo.photo" alt="" />
        </div>
        <!-- <div class="info-detail" @click="infoClick">
            <div class="info-detail-text">
                <h3 class="info-name">{{ profileInfo.name }}</h3>
                <p class="info-desc">
                    <img src="~_ats/img/profile/phone.svg" alt="" />{{
                        profileInfo.desc
                    }}
                </p>
            </div>
            <van-icon name="arrow" />
        </div> -->
        <van-cell
            @click="notClick"
            center
            :title="profileInfo.name"
            is-link
            :label="profileInfo.desc"
            size="large"
        >
            <template #label>
                <img class="info-desc-icon" src="~_ats/img/profile/phone.svg" alt="" />{{profileInfo.desc}}
            </template>
        </van-cell>
    </div>
</template>

<script>
import { Icon, Cell } from 'vant';
export default {
    name: 'ProfileInfo',
    components: {
        [Icon.name]: Icon,
        [Cell.name]: Cell,
    },
    props: {
        profileInfo: {
            type: Object,
            default() {
                return {
                    photo:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602245814617&di=b47eabc9be311d3f25cc9bb4bf8a0540&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F10%2F20200410180317_ujnix.thumb.400_0.jpeg',
                    name: '登录/注册',
                    desc: '暂未绑定手机号',
                };
            },
        },
    },
    methods: {
        notClick() {
            this.$toast({
                type: 'fail',
                message: '暂未开通\n此功能',
                // 弹框的时候禁止点击
                forbidClick: true,
                duration: 1500,
            });
        }
    },
};
</script>

<style scoped>
.profile-info {
    display: flex;
    align-items: center;
    height: 90px;
    padding: 0 20px;
    background-color: var(--color-tint);
}
.info-photo {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;
}
/* my */
.info-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #fff;
}
.info-photo > img {
    display: block;
    width: 100%;
}
.info-name {
    font-weight: normal;
    font-size: 16px;
}
.info-desc {
    margin-top: 5px;
    font-size: 14px;
}
.info-desc > img {
    vertical-align: bottom;
    width: 16px;
}
/* van-cell */
.van-cell {
    padding: 0;
    background: none;
    color: #fff;
}
.van-cell--clickable:active {
    background: none;
}
.info-desc-icon {
    vertical-align: text-bottom;
    width: 16px;
}
.van-cell__label,.van-cell__right-icon {
    margin-top: 1px;
    color: inherit;
}
</style>