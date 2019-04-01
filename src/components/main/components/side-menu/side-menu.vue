<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <div style='height:50px;display:block;margin:0 auto 20px;'>
        <div @click='returnPath("/")' style='cursor:pointer;width:calc(100% / 4 - 10px);float:left;height:50px;overflow:hidden;background:#19be6b;margin-right:5px;margin-left:13px;line-height:50px;text-align:center;'>
            <Icon type='md-home' color='#fff' size="40"/>
        </div>
        <div @click='returnPath("/newTask")' style='cursor:pointer;width:calc(100% / 4 - 10px);float:left;height:50px;overflow:hidden;background:#5cadff;margin-right:5px;line-height:50px;text-align:center;'>
            <Icon type='md-create' color='#fff' size="40" />
        </div>
        <div @click='returnPath("/clientList")' style='cursor:pointer;width:calc(100% / 4 - 10px);float:left;height:50px;overflow:hidden;background:#ff9900;margin-right:5px;line-height:50px;text-align:center;'>
            <Icon type='md-people' color='#fff' size="40" />
        </div>
        <div @click='returnPath("/noticesList")' style='cursor:pointer;width:calc(100% / 4 - 10px);float:left;height:50px;overflow:hidden;background:#ed4014;line-height:53px;text-align:center;'>
            <Icon type='ios-notifications' color='#fff' size="40" />
        </div>
    </div>

    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
        <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`">
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}"><common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)"/></a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  methods: {
    /**
     * @description 跳转到对应路由
     */
    returnPath(url){
        this.$router.push({path:url})
    },  
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
