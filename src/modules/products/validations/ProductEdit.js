import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import validationRule from '@/utils/validationRule'

export default (component) => {
  const res = {
    product: {
      category_id: {
      },
      model: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255)
      },
      features: {}
    }
  };

  if (component.product.category && component.product.category.features.length) {
    component.product.category.features.filter((el) => el.is_required).forEach((feature) => {
      res.product.features[feature.key] = validationRule(feature.type);
    });
    component.product.category.features.filter((el) => el.is_parent).forEach((feature) => {
      if (feature.children && feature.children.length) {
        feature.children.filter((el) => el.is_required).forEach((subFeature) => {
          res.product.features[subFeature.key] = validationRule(subFeature.type);
        });
      }
    });
  }

  return res;
}
