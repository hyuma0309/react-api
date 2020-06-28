import axios from 'axios'

/* APIサーバーのURL */
const API_HOST = process.env.API_HOST; //http://localhost:8080/

const productApi = axios.create({
    baseURL:'http://localhost:8080/api/products',
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
});

/**
 * アクセスに必要なヘッダーを作成します
 */
 const generateConfig = (apiToken) => ({
    headers: {Authorization: `Bearer:${apiToken}`}
});



/**
 * 商品情報一覧を取得
 */
const fetchAll =   (apiToken) => {
        const products = ( productApi.get('/', generateConfig(apiToken)));
        return products;
    }

/**
 * 商品を追加
 */
const add =   (title, desc, price, apiToken) => {
        const product = ( productApi.post('/',
        {
            title: title,
            description: desc,
            price: price
        },
        generateConfig(apiToken)));
        return product;
};

/**
 * 商品を更新
 */
const update =  (id, editForm, apiToken) => {
        const product = ( productApi.put(`/${id}`,
        editForm,generateConfig(apiToken)));
        return product;
};

/**
 * 商品を削除
 */
const $delete =  (id, apiToken) => {
        return  productApi.delete(`/${id}`, generateConfig(apiToken));
};



/**
 *  画像を追加
 */
const image =  (id, image, apiToken) => {
     axios.patch(`http://localhost:8080/api/products/${id}/images`,{productImage: image}, {
        headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${apiToken}`
        }});
};




export default {
    fetchAll,
    add,
    update,
    delete: $delete,
    image
};
