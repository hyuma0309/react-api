import axios from 'axios'

/* APIサーバーのURL */
const API_HOST = process.env.REACT_APP_API_HOST; //http://localhost:8080/

const productApi = axios.create({
    baseURL: API_HOST + '/api/products',
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
});

/**
 * apiのアクセスに必要なauthヘッダーを作成して返します
 * @param apiToken
 * @returns {Object} config
 */
 const generateConfig = (apiToken) => ({
    headers: {'Authorization': `Bearer ${apiToken}`}
});


/**
 * 商品情報一覧を取得します
 * @param apiToken
 * @returns {Promise<Product[]|String>}
 */
const fetchAll = async (apiToken) => {
        const products = (await productApi.get('/', generateConfig(apiToken))).data;
        products.forEach(v => {
            v.isVisible = true;
            v.editIsVisible = false;
        });
        return products;
    }
/**
 * 商品を追加します
 * @param body
 * @param apiToken
 * @returns {Promise<Product|String>}
 */
const add = async (title, desc, price, apiToken) => {
    try {
        const product = (await productApi.post('/', title, desc, price, generateConfig(apiToken))).data;
        product.isVisible = true;
        product.isEdit = false;
        return product;
    }
    catch (err) {
        if (err.response) {
            throw err.response.data.error.message;
        } else {
            throw err.message;
        }
    }
};

/**
 * 指定idの商品を更新します
 * @param id
 * @param body
 * @param apiToken
 * @returns {Promise<Product|String>}
 */
const update = async (id, title, desc, price, apiToken) => {
    try {
        const product = (await productApi.put(`/${id}`, title, desc, price, generateConfig(apiToken))).data;
        product.isVisible = true;
        product.isEdit = false;
        return product;
    }
    catch (err) {
        if (err.response) {
            throw err.response.data.error.message;
        } else {
            throw err.message;
        }
    }
};

/**
 * 指定idの商品を削除します
 * @param id
 * @param apiToken
 * @returns {Promise<AxiosResponse<T>|String>}
 */
const $delete = async (id, apiToken) => {
    try {
        return await productApi.delete(`/${id}`, generateConfig(apiToken));
    }
    catch (err) {
        if (err.response) {
            throw err.response.data.error.message;
        } else {
            throw err.message;
        }
    }
};

export default {
    fetchAll,
    add,
    update,
    delete: $delete
};
