<template>
    <div class="container">
        <blank 
            text="待审核项目"
            v-if="list.length === 0"    
        />
        <list-title titleText="待审核项目"/>
        <ul class="list">
            <li 
                class="list-item"
                v-for="(item) in list" :key="item.id"
            >
                <listitem 
                    :itemTitle="item.title"
                    :itemBrief="item.brief"
                    :itemid="item.id"
                    :itemTime="item.time"
                    type="shenhe"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import Listitem from '../../../components/Listitem.vue'
import ListTitle from '../../../components/listTitle.vue'
import blank from './../../../components/blank.vue'

export default {
    components: { blank, ListTitle, Listitem },
    data() {
        return {
            list: [
				{
					title: "你好你好",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 1
				},
				{
					title: "hello",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 2
				},
				{
					title: "hello",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 3
				},
				{
					title: "hello",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 4
				}
			]
        }
    },
    
}
</script>