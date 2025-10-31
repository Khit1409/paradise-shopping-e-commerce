import {
  ProductAttribute,
  ProductAttributeItem,
} from "@/components/seller/hook/CreateProductHook";
import { PRODUCT_ATTRIBUT_FOLLOW_CATEGORY } from "../components/seller/create-product-attribute";

/**
 * get attribute name (from slug in mongoodb) to name in List
 * @param name
 * @returns
 */
export const getAttrNameBySlug = (name: string) => {
  let result = "";
  for (const list of PRODUCT_ATTRIBUT_FOLLOW_CATEGORY) {
    for (const attribute of list.attribute) {
      if (attribute.slug === name) {
        result = attribute.name;
        break;
      }
    }
  }
  return result;
};
/**
 * find other category from PRODUCT_ATTRIBUTE_FOLLOW_CATEGORY
 * @param category
 */
export const getOtherCategoryName = (category: string) => {
  return PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.filter((f) => f.slug !== category);
};
/**
 * return attribute follow category and diffirent wiht isvalid attribute name
 */
export const getAttributeByCategory = (
  category: string,
  attributeExisted?: ProductAttribute[]
) => {
  return PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.find(
    (f) => f.slug === category
  )?.attribute.filter(
    (ft) => !attributeExisted?.find((f) => f.attrName === ft.slug)
  );
};
/**
 * get value by attribute name and diffirent with isvalid value
 */
export const getValueByAttName = (
  attrName: string,
  valueExisted?: ProductAttributeItem[]
) => {
  for (const list of PRODUCT_ATTRIBUT_FOLLOW_CATEGORY) {
    for (const attribute of list.attribute) {
      if (attribute.slug === attrName) {
        return attribute.value.filter(
          (ft) => !valueExisted?.find((f) => f.itemValue === ft)
        );
      }
    }
  }
};
