export interface Categories {
  cateName: string;
  cateTag: string[]; // #tag
  cateSlug: string;
  hashTag: CategoryHashTag[];
  product: Product[];
}
export interface CategoryHashTag {
  _id: string;
  cateId: string;
  tagName: string;
}
export interface Product {
  cateId: string; //id query collection categoies n-1
  proName: string;
  proPrice: string;
  proDescription: string;
  tagName: string[]; //tag #
  proImg: string;
  imgDetail: ImgDetail[];
  attribute: Attribute[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ImgDetail {
  proId: number; //n-1 id query collection products
  imgName: string;
  imgUrl: string;
}
export interface Attribute {
  proId: string; //n-1
  attrName: string;
}
export interface AttributeItem {
  attrId: string; //n-1
  itemValue: string;
  itemImg: string;
}
