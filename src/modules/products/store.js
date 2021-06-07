import axios from 'axios';
import products from './store/products';
import variants from './store/variants';

axios.defaults.baseURL = 'http://velohub.lndo.site/api';

export default {
  modules: {
    products,
    variants
  }
}
