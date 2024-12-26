// 编写store
import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
    name: "foods",
    initialState: {
        // 商品列表
        foodsList: [],

        // 更改activeIndex
        activeIndex: 0,

        // 购物车列表
        cartList: []

    },
    reducers: {

        // 更改商品列表
        setFoodsList (state, action){
            state.foodsList = action.payload
        },

        // 更改高亮index
        changeActiveIndex (statea,action){
            statea.activeIndex = action.payload
        },

        // 添加购物车
        addCart (state, action){
            // 是否添加过 以action.payload.id 去 cartList 中匹配,匹配到了更新数量，否则添加至购物车
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item){
                item.count++
            }else{
                action.payload.count=1
                state.cartList.push(action.payload) 
            }
            
        },
        // 购物车+ -
        increCount (state,action){
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        decreCount(state,action){
            const item = state.cartList.find(item => item.id === action.payload.id)

            if (item.count === 0){
                return
            }else{
                item.count--
            }
        },
        clearCart (state,action){
            state.cartList=[]
        }
    }
})

// 异步获取
const {setFoodsList, changeActiveIndex,addCart,increCount,decreCount,clearCart} = foodsStore.actions
const fetchFoodsList = ()=>{
    return async (dispath)=>{
        const res = await axios.get("http://localhost:3004/takeaway")
        dispath(setFoodsList(res.data))
    }
}

export { fetchFoodsList, changeActiveIndex, addCart,increCount,decreCount,clearCart}

const reducer = foodsStore.reducer
export default reducer