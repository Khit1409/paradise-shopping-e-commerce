import {
  ProductVariantAttribute,
  SingleProduct,
} from "@/type/product.interface";
import { EditProductApiResponse } from "@/type/seller.interface";
import React from "react";
/**
 * props type
 */
type ComponentProps = {
  data: SingleProduct;
  setData: React.Dispatch<React.SetStateAction<SingleProduct | null>>;
  editProduct: EditProductApiResponse[];
};
/**
 *
 * @returns
 */
export default function EditVaritant(props: ComponentProps) {
  const { data, setData, editProduct } = props;
  /**
   * find value is selected for stick checked of checkbox input
   * @param sku
   * @param name
   * @param value
   * @returns
   */
  const findIsChecked = (sku: string, name: string, value: string) => {
    if (!data) return false;
    const varitant = data.varitants.find((fv) => fv.sku === sku);
    if (!varitant) return false;
    const attribute = varitant.attributes.find((fAttr) => fAttr.name === name);
    if (!attribute) return false;
    return attribute.value.includes(value);
  };
  /**
   * find different attribute by category and attributes selected
   * @param category
   * @param attributes
   * @returns
   */
  const findDifferentAttributes = (attributes: ProductVariantAttribute[]) => {
    const selectedAttrName = attributes.map((attr) => attr.name);
    const result = editProduct[0]?.attributes.filter(
      (ft) => !selectedAttrName.includes(ft.name)
    );
    return result;
  };
  /**
   * find different attribute value list by category name , attribute name and existed value list
   * @param categoryName
   * @param attrName
   * @param currentValues
   * @returns
   */
  const findDifferentAttributeValues = (
    attrName: string,
    currentValues: string[]
  ) => {
    const attribute = editProduct[0]?.attributes.find(
      (attr) => attr.name === attrName
    );
    if (!attribute) return [];
    return attribute.value.filter((val) => !currentValues.includes(val));
  };
  /**
   * up new attribute value if seller is pushing new attribute value to
   * old attribute value list
   * @param sku
   * @param name
   * @param value
   */
  const onChangeAttributeValue = (sku: string, name: string, value: string) => {
    setData((prev) => {
      if (!prev) return null;
      const newVaritants = prev.varitants.map((varitant) => {
        if (varitant.sku === sku) {
          const newAttributes = varitant.attributes.map((attribute) => {
            if (attribute.name === name) {
              let newValues = [...attribute.value];
              if (newValues.includes(value))
                newValues = newValues.filter((v) => v !== value);
              else newValues.push(value);
              return { ...attribute, value: newValues };
            }
            return attribute;
          });
          return { ...varitant, attributes: newAttributes };
        }
        return varitant;
      });
      return { ...prev, varitants: newVaritants };
    });
  };
  /**
   * add new attribute name and attribute values list to old product data
   * @param sku
   * @param name
   * @param value
   */
  const onChangeVaritantAttributes = (
    sku: string,
    name: string,
    value?: string
  ) => {
    setData((prev) => {
      if (!prev) return null;
      const newVaritants = prev.varitants.map((varitant) => {
        let newAttributes = [...varitant.attributes];
        if (varitant.sku === sku) {
          const attrIdx = newAttributes.findIndex((attr) => attr.name === name);
          if (attrIdx !== -1) {
            if (!value) {
              newAttributes = newAttributes.filter(
                (ftAttr) => ftAttr.name !== name
              );
            } else {
              newAttributes.map((newAttr) =>
                newAttr.name === name
                  ? { ...newAttr, value: [...newAttr.value, value] }
                  : newAttr
              );
            }
          } else {
            newAttributes.push({ name, value: value ? [value] : [] });
          }
          return { ...varitant, attributes: newAttributes };
        } else {
          return varitant;
        }
      });
      return { ...prev, varitants: newVaritants };
    });
  };
  /**
   * render component
   */
  return (
    <section className="bg-white">
      <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4">
        Phân loại sản phẩm
      </h2>
      {data.varitants.map((variant) => (
        <div key={variant.sku} className="border- pt-4 mt-4 space-y-3">
          <h4 className="font-semibold text-base">
            Mẫu: <span className="text-gray-500">{variant.sku}</span>
          </h4>

          <div className="flex items-center gap-3">
            <strong className="text-sm">Tồn kho:</strong>
            <input
              type="number"
              defaultValue={variant.stoke}
              onChange={(e) => {
                setData((prev) => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    varitants: prev.varitants.map((vari) =>
                      vari.sku === variant.sku
                        ? { ...vari, stoke: Number(e.target.value) }
                        : vari
                    ),
                  };
                });
              }}
              className="border border-gray-300 d outline-none p-1 w-[100px] text-center"
            />
          </div>

          {variant.attributes.map((attr) => (
            <div key={attr.name} className="pt-2">
              <strong className="block mb-1">{attr.name}</strong>
              <div className="grid grid-cols-3 gap-1">
                {attr.value.map((val) => (
                  <label key={val} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={findIsChecked(variant.sku, attr.name, val)}
                      onChange={() =>
                        onChangeAttributeValue(variant.sku, attr.name, val)
                      }
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1 border-t border-gray-300 mt-2 pt-1">
                {findDifferentAttributeValues(attr.name, attr.value).map(
                  (val) => (
                    <label key={val} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={findIsChecked(variant.sku, attr.name, val)}
                        onChange={() =>
                          onChangeAttributeValue(variant.sku, attr.name, val)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          ))}

          {findDifferentAttributes(variant.attributes) && (
            <div className="my-2">
              <strong>Phân loại khác</strong>
              <div className="border-t border-gray-300">
                {findDifferentAttributes(variant.attributes).map((attr) => (
                  <div key={attr.name} className="pt-2">
                    <label
                      htmlFor={`new-attribute-name-${attr.name}`}
                      className="flex items-center w-max gap-1 mb-1"
                    >
                      <input
                        type="checkbox"
                        id={`new-attribute-name-${attr.name}`}
                        onChange={() => {
                          onChangeVaritantAttributes(variant.sku, attr.name);
                        }}
                      />
                      <strong className="block">{attr.name}</strong>
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {attr.value.map((val) => (
                        <label key={val} className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            onChange={() =>
                              onChangeVaritantAttributes(
                                variant.sku,
                                attr.name,
                                val
                              )
                            }
                          />
                          <span>{val}</span>
                        </label>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1 border-t border-gray-300 mt-2 pt-1">
                      {findDifferentAttributeValues(attr.name, attr.value).map(
                        (val) => (
                          <label key={val} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={findIsChecked(
                                variant.sku,
                                attr.name,
                                val
                              )}
                              onChange={() =>
                                onChangeAttributeValue(
                                  variant.sku,
                                  attr.name,
                                  val
                                )
                              }
                            />
                            <span>{val}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
