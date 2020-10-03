const url = 'https://wow.ieeeshasb.org/'; 
const auth = 'api/auth/'; 
const mobile = 'api/mobile/'; 
const dashboard = 'api/dashboard/'; 
const chat = 'api/chat/'; 
const authMobile = 'api/auth/mobile/'

const lang = localStorage.getItem('lang') || 0;

export const addMainCategoryUrl = url + dashboard + 'add_main_category'

// get
export const getMainCategoryNamesUrl = url + dashboard + 'main_categories_names/' +lang
export const getAllHomeSlidersUrl = url + dashboard + 'all_home_slider/' +lang
export const getSpecificMainCategoryNamesUrl = url + dashboard + 'specific_category/'


// delete
export const deleteMainCategoryUrl = url + dashboard + 'delete_category/'


// update 
export const updateMainCategoryUrl = url + dashboard + 'update_category/'
