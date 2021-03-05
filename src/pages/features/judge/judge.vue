<template>
    <div class="container">
        <blank
            text="待评审项目"
            v-if="isBlank"
        ></blank>

        <div 
            class="projectList"
            v-else    
        >
            <ul class="list">
                <li 
                    class="items"
                    v-for="item in list"
                    :key="item.id"
                >
                    <listitem
                        :itemTitle="item.title"
                        :itemBrief="item.brief"
                        :itemTime="item.time"
                        :status="item.status"
                        :itemId="item.id"
                        type="judge"
                    ></listitem>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import blank from '../../../components/blank.vue';
import Listitem from './../../../components/Listitem.vue';

export default {
    components: { blank, Listitem },
    data() {
        return {
            isBlank: false, // 空页面显示
            list: [
                {
                    title: "nihao你好",
                    brief: "nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好",
                    id: 1,
                    time: "12:12:12 2/12",
                    status: "complete"
                },
                {
                    title: "nihao你好",
                    brief: "nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好",
                    id: 2,
                    time: "12:12:12 2/12",
                    status: "notyet"
                },
                {
                    title: "nihao你好",
                    brief: "nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好",
                    id: 3,
                    time: "12:12:12 2/12",
                    status: "complete"
                },
                {
                    title: "nihao你好",
                    brief: "nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好",
                    id: 4,
                    time: "12:12:12 2/12",
                    status: "complete"
                },
                {
                    title: "nihao你好",
                    brief: "nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好",
                    id: 5,
                    time: "12:12:12 2/12",
                    status: "complete"
                },
                {
                    title: "nihao你好",
                    brief: "nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好",
                    id: 6,
                    time: "12:12:12 2/12",
                    status: "complete"
                },
                {
                    title: "nihao你好",
                    brief: "nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好nihao你好",
                    id: 7,
                    time: "12:12:12 2/12",
                    status: "complete"
                }
            ]
        }
    },
    
}
</script>

<style lang="less" scoped>

</style>