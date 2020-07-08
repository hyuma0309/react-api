import axios from 'axios';

/* APIサーバーのURL */
const REACT_APP_HOST = process.env.REACT_APP_HOST; //http://localhost:8080/

const productApi = axios.create({
  baseURL: REACT_APP_HOST + 'api/products',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

/**
 * アクセスに必要なヘッダーを作成します
 */
const generateHeader = apiToken => ({
  headers: { Authorization: `Bearer:${apiToken}` },
});

/**
 * 商品情報一覧を取得
 */
const login = apiToken => {
  const products = productApi.get('/', generateHeader(apiToken));
  return products;
};

/**
 * 商品を追加
 */
const add = (title, description, price, apiToken) => {
  const product = productApi.post(
    '/',
    {
      title: title,
      description: description,
      price: price,
    },
    generateHeader(apiToken)
  );
  return product;
};

/**
 * 商品を更新
 */
const update = (id, editForm, apiToken) => {
  const product = productApi.put(`/${id}`, editForm, generateHeader(apiToken));
  return product;
};

/**
 * 商品を削除
 */
const $delete = (id, apiToken) => {
  return productApi.delete(`/${id}`, generateHeader(apiToken));
};

/**
 *  画像HOST
 */
const image = (id, imagePath, apiToken) => {
  axios.patch(REACT_APP_HOST + 'api/products' + `/${id}` + `/images`, imagePath, {
    headers: {
      Authorization: `Bearer:${apiToken}`,
    }
  }

  );
};
/**
 * 画像を取得
 */
const getImage = (id, imagePath, apiToken) => {
   axios.get(REACT_APP_HOST + 'api/products' + `/${id}` + `/images` + `/${imagePath}`,imagePath,{
    headers: {
      Authorization: `Bearer:${apiToken}`,
    }
  });
};

export default {
  login,
  add,
  update,
  delete: $delete,
  image,
  getImage
};
