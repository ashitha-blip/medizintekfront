import { commonAPI } from "./commonAPI";
import { server_url } from "./server_url";

export const loginAPI=async(reqBody)=>{
  return await commonAPI("POST", `${server_url}/login`, reqBody, "");
}
export const registerAPI=async(reqBody)=>{
  return await commonAPI("POST", `${server_url}/register`, reqBody, "");
}
export const editProfile=async(editUser,reqHeader)=>{
  return await commonAPI("PUT", `${server_url}/edit-profile`, editUser, reqHeader);
}

export const addProductAPI = async (reqBody,reqHeader) => {   
    return await commonAPI("POST", `${server_url}/add-product`, reqBody, reqHeader);
  };

  // getAllProducts
  export const getAllProducts=async()=>{
    return await commonAPI("GET",`${server_url}/get-all-products`,"","")
  }
  //  
  export const getAllUsers=async()=>{
    return await commonAPI("GET",`${server_url}/get-all-users`,"","")
  }
  // getCategoryProducts
  export const getCategoryProducts=async(category,reqHeader)=>{      
    return await commonAPI("GET",`${server_url}/get-category-products/${category}`,"",reqHeader)
  }
  // getBrandProducts
  export const getBrandProducts=async(brand,reqHeader)=>{      
    return await commonAPI("GET",`${server_url}/get-brand-products/${brand}`,"",reqHeader)
  }

  // getUser
  export const getUser=async(reqHeader)=>{
    return await commonAPI("GET",`${server_url}/get-user-details`,"",reqHeader)
  }

  // getProductDetails
  export const getProductDetails=async(id)=>{
    return await commonAPI("GET",`${server_url}/get-product-details/${id}`,"","")
  }
  // deleteAProduct
  export const deleteAProduct=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${server_url}/delete-product/${id}`,"",reqHeader)
  }
  // updateProduct
  export const updateProduct=async(id,formData,reqHeader)=>{
    return await commonAPI("PUT",`${server_url}/update-product/${id}`,formData,reqHeader)
  }

// Search Products API
export const getSearchResults = async (query) => {
  console.log(query,"query");
  
  return await commonAPI("GET", `${server_url}/search?query=${query}`, "", "");
};



// BRANDS

export const addNewBrand = async ( reqBody,reqHeader) => {
  return await commonAPI("POST", `${server_url}/add-brand`, reqBody, reqHeader);
};
export const viewBrands = async ( reqHeader) => {
  return await commonAPI("GET", `${server_url}/all-brands`, "", reqHeader);
};
export const viewBrandDetails = async ( id,reqHeader) => {
  return await commonAPI("GET", `${server_url}/brand-details/${id}`, "", reqHeader);
};
export const updateBrand = async ( id,reqBody,reqHeader) => {
  return await commonAPI("PUT", `${server_url}/update-brand/${id}`, reqBody, reqHeader);
};
export const deleteBrand = async ( id,reqHeader) => {
  return await commonAPI("DELETE", `${server_url}/delete-brand/${id}`, "", reqHeader);
};



// CATEGORIES

export const addNewCategory = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/add-category`, reqBody, reqHeader);
};

export const viewCategories = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/all-categories`, "", reqHeader);
};

export const viewCategoryDetails = async (id, reqHeader) => {
  return await commonAPI("GET", `${server_url}/category-details/${id}`, "", reqHeader);
};

export const updateCategory = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${server_url}/update-category/${id}`, reqBody, reqHeader);
};

export const deleteCategory = async (id, reqHeader) => {
  return await commonAPI("DELETE", `${server_url}/delete-category/${id}`, "", reqHeader);
};


// CART


export const getCartItems = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/get-cart`, "", reqHeader);
};

export const addToCart = async (productData, reqHeader) => {  
  return await commonAPI("POST", `${server_url}/add-to-cart`, productData, reqHeader);
};

export const updateCartItem = async (productId,reqbody, reqHeader) => {  
  return await commonAPI("PUT", `${server_url}/update-cart/${productId}`, reqbody, reqHeader);
};

export const removeCartItem = async (productId, reqHeader) => {
  return await commonAPI("DELETE", `${server_url}/remove-cartitem`, productId, reqHeader);
};

export const clearCart = async (cartId,reqHeader) => {
  return await commonAPI("DELETE", `${server_url}/clear-cart/${cartId}`, "", reqHeader);
};


// ORDERS
// placeOrder
export const placeOrder=async(orderDetails,reqHeader)=>{
  return await commonAPI("POST", `${server_url}/place-order`, orderDetails, reqHeader);
}

export const changeStatus=async(reqBody,reqHeader)=>{
  return await commonAPI("POST", `${server_url}/change-status`, reqBody, reqHeader);
}
export const cancelOrder=async(reqBody,reqHeader)=>{
  return await commonAPI("PUT", `${server_url}/change-status`, reqBody, reqHeader);
}

export const getAllOrders = async (reqHeader) => {
  console.log("get all orders");
  
  return await commonAPI("GET", `${server_url}/get-user-orders`, "", reqHeader);
};
export const getOrders = async (reqHeader) => {
  console.log("get all orders");
  return await commonAPI("GET", `${server_url}/get-all-orders`, "", reqHeader);
};
