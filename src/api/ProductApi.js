import axios from 'axios'

/* APIサーバーのURL */
const API_HOST = process.env.API_HOST; //http://localhost:8080/

const productApi = axios.create({
    baseURL: API_HOST + 'api/products',
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
});

/**
 * apiのアクセスに必要なauthヘッダーを作成して返します
 */
 const generateConfig = (apiToken) => {
    productApi.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${apiToken}`
        return config;
      })
};

 


/**
 * 商品情報一覧を取得します
 */
const fetchAll = async (apiToken) => {
        const products = (await productApi.get('/', generateConfig(apiToken)));
        console.log('成功')
        return products;
    }

/**
 * 商品を追加します
 */
const add = async (title, desc, price, apiToken) => {
        const product = (await productApi.post('/', title, desc, price, generateConfig(apiToken)));
        return product;
};

/**
 * 指定idの商品を更新します
 */
const update = async (id, title, desc, price, apiToken) => {
        const product = (await productApi.put(`/${id}`, title, desc, price, generateConfig(apiToken)));
        return product;
};

/**
 * 指定idの商品を削除します
 */
const $delete = async (id, apiToken) => {
        return await productApi.delete(`/${id}`, generateConfig(apiToken));
};




export default {
    fetchAll,
    add,
    update,
    delete: $delete
};
