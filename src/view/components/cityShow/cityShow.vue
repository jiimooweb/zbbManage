<template>
    <div>
        <Modal class="citySelectPage" width='850px' v-model="show" title='投放城市' footer-hide :mask-closable='false'>
            <div @click="closeAllSelect()">
            <!-- <div @click="closeAllSelect()">
                <div class="btnPage">
                <Button @click="setItemSelect(true)">全选</Button>
                <Button style="margin-left:10px;" @click="setItemSelect(false)">取消全选</Button>
                </div>
            </div> -->
            <!-- <div class="searchPage">
                <Select ref="select" v-model="searchData" placeholder='查找' style="width:300px" :clearable="true" filterable @on-change='cantEvent'>
                    <OptionGroup v-for="(sitem,index) in cityAll" :label="sitem.name" :key="sitem.name">
                        <Option v-for="(item,index1) in sitem.cities" :value="item.name" :key="item.name">
                            <Checkbox v-model="item.select" @on-change='selectCity(item,index)'>{{item.name}}</Checkbox>
                        </Option>
                    </OptionGroup>
                </Select>
            </div> -->
            <div class="cityPage">
                <div class="cityItem" v-for="(item,index) in cityAll" :key='index'>
                    <div class="citySName">
                        <Checkbox v-model="item.select" class="showCheck" disabled @on-change='selectCityS(item,index)'>{{item.name}}<span v-if="item.cities.length>1">({{item.cities.length}})</span></Checkbox>
                        <Icon type="md-arrow-dropdown" :color='!item.cityShow?"#aaa":"#2d8cf0"' size='23' @click.stop="showCities(index)"
                            v-if="item.cities.length>1" />
                        <div class="citiesList" v-if="item.cityShow" @click.stop="">
                            <p class="citiesTitle">{{item.name}}({{item.cities.length}})</p>
                            <div class="cityCPage">
                                <div class="cityCItem" v-for="(item,index1) in item.cities" :key='index1'>
                                    <div class="cityCName">
                                        <Checkbox v-model="item.select" class="showCheck" disabled @on-change='selectCity(item,index)'>{{item.name}}</Checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import cityArr from "../../../assets/city.js";
export default {
    name: "citySelect",
    data() {
        return {
            show: false,
            cityAll: [],
            selectArr: [],
            cityFilter: [],
            searchData: ""
        };
    },
    methods: {
        //隐藏所有下级选框
        closeAllSelect(index = -1){
            for (let i = 0; i < this.cityAll.length; i++) {
                this.cityAll[i].cityShow = false
            }
            if(index !== -1){
                this.$set(this.cityAll[index],"cityShow",!this.cityAll[index].cityShow);
            }
        },
        //阻止冒泡
        cantEvent(){
            this.$refs.select.clearSingleSelect()
            this.$refs.select.toggleMenu(null, true)
        },
        returnCity() {
            this.$emit("listenToparent", this.selectArr);
        },
        closeCitySelect(i) {
            this.show = i;
        },
        selectCityS(item, index) {
            if (item.select) {
                for (let i = 0; i < item.cities.length; i++) {
                    this.selectArr.push(item.cities[i].name);
                    // item.cities[i].select = true
                    this.$set(item.cities[i], "select", true);
                }
            } else {
                for (let i = 0; i < item.cities.length; i++) {
                    this.selectArr.splice(
                        this.selectArr.indexOf(item.cities[i].name),
                        1
                    );
                    this.$set(item.cities[i], "select", false);
                }
            }
        },
        selectCity(item, index) {
            if (item.select) {
                this.selectArr.push(item.name);
                this.cityAll[index].select = true;
            } else {
                this.selectArr.splice(this.selectArr.indexOf(item.name), 1);
                for (let i = 0; i < this.cityAll[index].cities.length; i++) {
                    if (this.cityAll[index].cities[i].select) {
                        return;
                    }
                    if(i === this.cityAll[index].cities.length-1){
                        this.cityAll[index].select = false;
                    }
                }
            }
        },
        initData(cityList) {
            if(!cityList || cityList == null){
                cityList = []
            }
            for (let i in cityArr.provinces) {
                cityArr.provinces[i].select = false;
                cityArr.provinces[i].cityShow = false;
                for (let j in cityArr.provinces[i].cities) {
                    cityArr.provinces[i].cities[j].select = false;
                    this.selectArr.push(cityArr.provinces[i].cities[j].name);
                    this.cityFilter.push(cityArr.provinces[i].cities[j]);
                }
            }
            this.cityAll = cityArr.provinces;
            for(let i=0;i<cityList.length;i++){
                for(let j=0;j<this.cityAll.length;j++){
                    for(let z=0;z<this.cityAll[j].cities.length;z++){
                        if(cityList[i] === this.cityAll[j].cities[z].name){
                            this.cityAll[j].cities[z].select = true
                            this.cityAll[j].select = true
                        }
                    }
                }
            }
            this.show = true
        },
        //设置所有选项
        setItemSelect(state) {
            this.selectArr = [];
            for (let i in this.cityAll) {
                this.cityAll[i].select = state;
                for (let j in this.cityAll[i].cities) {
                    this.cityAll[i].cities[j].select = state;
                    if (state) {
                        this.selectArr.push(this.cityAll[i].cities[j].name);
                    }
                }
            }
        },
        //显示子选项
        showCities(index) {
            this.closeAllSelect(index)
            let currentArr = this.cityAll[index];
            // this.$set(
            //     this.cityAll[index],
            //     "cityShow",
            //     !this.cityAll[index].cityShow
            // );
            
        }
    },
    mounted() {
        
    }
};
</script>

<style lang="less">
.citySelectPage {
    user-select: none;
    .btnPage {
        overflow: hidden;
        margin-bottom: 10px;
        float: left;
    }
    .searchPage {
        margin-bottom: 10px;
        float: right;
    }
}
.cityPage {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .cityItem {
        height: 50px;
        width: calc(100% / 4);
        border: 1px solid #ddd;
        line-height: 50px;
        text-align: center;
        margin: 0px 0px -1px -1px;
        .citySName {
            .citiesList {
                position: absolute;
                width: 500px;
                padding: 0 0 15px;
                z-index: 100;
                border: 1px solid #ddd;
                box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.3);
                background: #fff;
                .citiesTitle {
                    width: 90%;
                    margin: 0 auto;
                    padding: 0 10px;
                    border-bottom: 1px solid #aaa;
                    line-height: 35px;
                    font-size: 16px;
                    text-align: left;
                }
            }
        }
    }
}
.cityCPage {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .cityCItem {
        height: 40px;
        width: calc(100% / 3);
        line-height: 40px;
        margin: 0px 0px -1px -1px;
    }
}
.showCheck .ivu-checkbox-inner{
    background: #fff !important;
    border-color: #2d8cf0 !important;
}
.showCheck .ivu-checkbox-inner::after{
    background: #fff !important;
    border-color: #2d8cf0 !important;
}
</style>