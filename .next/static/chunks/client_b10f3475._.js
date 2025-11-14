(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/components/product/PriceBox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PriceBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PriceBox(props) {
    /**
   * props
   */ const { price, sale } = props;
    /**
   * tsx
   */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xl text-red-500",
                children: [
                    sale ? (price - price * sale / 100).toLocaleString("vi-VN") : price.toLocaleString("vi-VN"),
                    "$"
                ]
            }, void 0, true, {
                fileName: "[project]/client/components/product/PriceBox.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "line-through",
                children: sale ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        (price - (price - price * sale / 100)).toLocaleString("vi-VN"),
                        "$"
                    ]
                }, void 0, true) : null
            }, void 0, false, {
                fileName: "[project]/client/components/product/PriceBox.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "flex px-1 items-center gap-1 text-white bg-red-500",
                children: [
                    sale,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "%"
                    }, void 0, false, {
                        fileName: "[project]/client/components/product/PriceBox.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/components/product/PriceBox.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/components/product/PriceBox.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = PriceBox;
var _c;
__turbopack_context__.k.register(_c, "PriceBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/product/ProductVaritant.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductVaritant",
    ()=>ProductVaritant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/image.js [app-client] (ecmascript)");
;
;
const ProductVaritant = (props)=>{
    const { setSelectedVaritant, selectedVaritant, varitants } = props;
    //onchange attribute
    const onchangeVaritant = (param)=>{
        const { sku, name, value } = param;
        setSelectedVaritant((prev)=>{
            if ((prev === null || prev === void 0 ? void 0 : prev.sku) === sku) {
                var _prev_attributes;
                let varitantAttr = [
                    ...(_prev_attributes = prev.attributes) !== null && _prev_attributes !== void 0 ? _prev_attributes : []
                ];
                const index = varitantAttr.findIndex((f)=>f.name === name);
                if (index !== -1) {
                    varitantAttr[index] = {
                        ...varitantAttr[index],
                        name: name !== null && name !== void 0 ? name : varitantAttr[index].name,
                        value: value !== null && value !== void 0 ? value : varitantAttr[index].value
                    };
                } else {
                    varitantAttr = [
                        ...varitantAttr,
                        {
                            name: name,
                            value: value || ""
                        }
                    ];
                }
                return {
                    ...prev,
                    attributes: varitantAttr
                };
            }
            return {
                sku,
                attributes: [
                    {
                        name,
                        value: value || ""
                    }
                ]
            };
        });
    };
    const checkedValue = (sku, name, value)=>{
        if ((selectedVaritant === null || selectedVaritant === void 0 ? void 0 : selectedVaritant.sku) === sku) {
            const selected = selectedVaritant.attributes.find((f)=>f.name === name);
            return (selected === null || selected === void 0 ? void 0 : selected.value) === value ? "bg-gray-400 text-white" : "bg-white hover:bg-gray-200";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "py-2 border-b border-gray-300 mb-3",
                children: "PHÂN LOẠI SẢN PHẨM"
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-5",
                children: varitants.map((varitant, indexOfVart)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "uppercase",
                                children: varitant.sku
                            }, void 0, false, {
                                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: [
                                    "còn:",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ms-1",
                                        children: varitant.stoke
                                    }, void 0, false, {
                                        fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                        lineNumber: 58,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            varitant.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: varitant.image,
                                width: 100,
                                height: 100,
                                alt: "",
                                objectFit: "cover"
                            }, void 0, false, {
                                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: varitant.attributes.map((vartAttr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold",
                                                children: vartAttr.name
                                            }, void 0, false, {
                                                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-2",
                                                children: vartAttr.value.map((val, indexOfVal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            onchangeVaritant({
                                                                sku: varitant.sku,
                                                                name: vartAttr.name,
                                                                value: val
                                                            });
                                                        },
                                                        className: "border border-gray-300 px-2 py-1 hover:bg-gray-400 ".concat(checkedValue(varitant.sku, vartAttr.name, val)),
                                                        children: val
                                                    }, indexOfVal, false, {
                                                        fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                                lineNumber: 74,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, vartAttr.name, true, {
                                        fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, indexOfVart, true, {
                        fileName: "[project]/client/components/product/ProductVaritant.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductVaritant.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/client/components/product/ProductVaritant.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ProductVaritant;
var _c;
__turbopack_context__.k.register(_c, "ProductVaritant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/product/ProductInfoTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductInfoTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$PriceBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/product/PriceBox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$ProductVaritant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/product/ProductVaritant.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function ProductInfoTable(props) {
    _s();
    /**
   * props
   */ const { info, rating, price, sale, varitants, selectedVaritant, setSelectedVaritant } = props;
    /**
   * component state
   */ const [showMore, setShowModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /**
   *
   */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-2xl uppercase",
                children: info.name
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1",
                children: Array.from({
                    length: rating
                }).map((_, indexOfStart)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                            className: "text-yellow-500 text-xl",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faStar"]
                        }, void 0, false, {
                            fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)
                    }, indexOfStart, false, {
                        fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$PriceBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                price: price,
                sale: sale
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-3",
                        children: "Mô tả sản phẩm: "
                    }, void 0, false, {
                        fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        dangerouslySetInnerHTML: {
                            __html: info.description
                        },
                        className: "product-description-from-api overflow-y-hidden ".concat(showMore ? "h-[250px]" : "h-max", " ")
                    }, void 0, false, {
                        fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-start items-center py-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowModel(!showMore),
                            className: "text-center text-gray-500",
                            children: showMore ? "Xem thêm..." : "...Ẩn bớt"
                        }, void 0, false, {
                            fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$ProductVaritant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductVaritant"], {
                varitants: varitants,
                selectedVaritant: selectedVaritant,
                setSelectedVaritant: setSelectedVaritant
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductInfoTable.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/components/product/ProductInfoTable.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(ProductInfoTable, "djDJWEWodz1Fo6mkop01NYCs/Rw=");
_c = ProductInfoTable;
var _c;
__turbopack_context__.k.register(_c, "ProductInfoTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/product/ProductImage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function ProductImage(props) {
    _s();
    /**
   * props
   */ const { thumbnail, images } = props;
    /**
   * component state
   */ const [imgPreview, setImgPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 w-1/2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: imgPreview !== null && imgPreview !== void 0 ? imgPreview : thumbnail,
                alt: "thumbnail image",
                width: 400,
                objectFit: "cover",
                height: 300,
                className: "border border-gray-200 h-[400px] flex-1"
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductImage.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2",
                children: images.map((img, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: img,
                        alt: "thumbnail",
                        width: 100,
                        height: 100,
                        onMouseEnter: ()=>setImgPreview(img),
                        className: "border border-gray-200 hover:border-red-400 hover:scale-[1.05] transition-all duration-200 cursor-pointer"
                    }, index, false, {
                        fileName: "[project]/client/components/product/ProductImage.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/client/components/product/ProductImage.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/components/product/ProductImage.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(ProductImage, "9Upu/iyE3b8wUovL0yIdgKaplps=");
_c = ProductImage;
var _c;
__turbopack_context__.k.register(_c, "ProductImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/product/HashtagList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HashtagList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function HashtagList(props) {
    const { tags } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 py-2 border-t border-gray-300 flex-wrap",
        children: tags.map((tag, indexOfTag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "text-blue-600 hover:underline",
                href: "/user/search/".concat(tag.replace("#", "")),
                children: tag
            }, indexOfTag, false, {
                fileName: "[project]/client/components/product/HashtagList.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/client/components/product/HashtagList.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = HashtagList;
var _c;
__turbopack_context__.k.register(_c, "HashtagList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/hook/product/SingleProductHook.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SingleProductHook",
    ()=>SingleProductHook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$service$2f$cart$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/service/cart.service.ts [app-client] (ecmascript)");
;
const SingleProductHook = ()=>{
    /**
   * handle add to cart and check result ok or failed
   * @param data
   * @returns
   */ const handleCart = async (data)=>{
        const { info, original_price, quantity, thumbnail, varitants } = data;
        if (!varitants) {
            return {
                message: "Varitant is not define",
                error: "Not enougre value!",
                success: false
            };
        }
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$service$2f$cart$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToCart"])({
            info,
            original_price,
            quantity,
            thumbnail,
            varitants
        });
        return res;
    };
    /**
   * check out handle
   * add to cart => navigation to checkout page add on success modal
   * @param data
   * @returns
   */ /**
   * handle add to cart
   */ /**
   * return
   */ return {
        handleCart
    };
};
_c = SingleProductHook;
var _c;
__turbopack_context__.k.register(_c, "SingleProductHook");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/components/product/page/SingleProductPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SingleProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$ProductInfoTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/product/ProductInfoTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$ProductImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/product/ProductImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$HashtagList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/components/product/HashtagList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$product$2f$thunk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/redux/product/thunk.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$hook$2f$product$2f$SingleProductHook$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/hook/product/SingleProductHook.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/redux/app/slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$order$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/redux/order/slice.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function SingleProductPage() {
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const { product } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SingleProductPage.useSelector": (state)=>state.product
    }["SingleProductPage.useSelector"]);
    const id = localStorage.getItem("selected_product_id");
    /**
   *
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SingleProductPage.useEffect": ()=>{
            ({
                "SingleProductPage.useEffect": async ()=>{
                    await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$product$2f$thunk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSingleProductThunk"])(id));
                }
            })["SingleProductPage.useEffect"]();
        }
    }["SingleProductPage.useEffect"], [
        id,
        dispatch
    ]);
    /**
   * react hook
   */ const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedVaritant, setSelectedVaritant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const hook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$hook$2f$product$2f$SingleProductHook$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SingleProductHook"])();
    /**
   * return not found product before create function
   */ if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "uppercase",
                children: [
                    "NOT FOUND PRODUCT WITH ID: ",
                    id
                ]
            }, void 0, true, {
                fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this);
    }
    /**
   * handle
   * @returns
   */ const handleCheckValidate = ()=>{
        if (quantity == 0) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorModel"])({
                onError: true,
                mess: "Vui lòng chọn số lượng!"
            }));
            return false;
        }
        if (!selectedVaritant || !selectedVaritant.sku || selectedVaritant.attributes.length == 0) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorModel"])({
                mess: "Vui lòng chọn phân loại hàng và giá trị phân loại!",
                onError: true
            }));
            return false;
        }
        const varitant = product.varitants.find((f)=>f.sku === selectedVaritant.sku);
        if (varitant) {
            if (varitant.attributes.length > selectedVaritant.attributes.length) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorModel"])({
                    mess: "Vui lòng chọn đủ giá trị phân loại hàng",
                    onError: true
                }));
                return false;
            }
        }
        return true;
    };
    const submitAddCart = async ()=>{
        const handled = handleCheckValidate();
        if (!handled) {
            return;
        }
        const { info, thumbnail, original_price, id } = product;
        const data = {
            info: {
                product_id: id,
                name: info.name,
                slug: info.slug
            },
            varitants: selectedVaritant,
            thumbnail,
            original_price,
            quantity,
            total_price: original_price * quantity
        };
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onLoadingAction"])(true));
        const result = await hook.handleCart(data);
        if (result) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onLoadingAction"])(false));
            if (result.success) {
                return dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSuccessfulModel"])(true));
            } else {
                return dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$app$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorModel"])({
                    onError: true,
                    mess: result.message
                }));
            }
        }
    };
    /**
   * calculator price with sale
   * @returns
   */ const calculatorTotalPirce = ()=>{
        const { original_price, sale } = product;
        if (sale == 0) {
            return original_price;
        }
        const minusSale = original_price - original_price * sale / 100;
        const totalPrice = minusSale * quantity;
        return totalPrice;
    };
    /** UI */ const handleOrderValue = ()=>{
        const check = handleCheckValidate();
        if (!check) {
            return null;
        }
        const { info, thumbnail, id } = product;
        const { attributes, sku } = selectedVaritant;
        const item = {
            name: info.name,
            img: thumbnail,
            product_id: id,
            quantity: quantity,
            total_price: calculatorTotalPirce()
        };
        return {
            ...item,
            varitants: {
                sku,
                attributes
            }
        };
    };
    const submitOrder = async ()=>{
        const payload = handleOrderValue();
        if (!payload) {
            return;
        }
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$redux$2f$order$2f$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onOpenOrderModal"])(payload));
    };
    /** UI */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-gray-50 text-gray-700",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto p-5 bg-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col lg:flex-row gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$ProductImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            images: product.images,
                            thumbnail: product.thumbnail
                        }, void 0, false, {
                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1/2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$ProductInfoTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    selectedVaritant: selectedVaritant,
                                    setSelectedVaritant: setSelectedVaritant,
                                    varitants: product.varitants,
                                    info: product.info,
                                    rating: product.rating,
                                    price: product.original_price,
                                    sale: product.sale
                                }, void 0, false, {
                                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex border-t border-gray-300 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: quantity == 0,
                                            className: "px-2 border border-gray-300 border-r-transparent",
                                            onClick: ()=>{
                                                setQuantity((prev)=>prev - 1);
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faMinus"]
                                            }, void 0, false, {
                                                fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "quanity",
                                            id: "quantity",
                                            onChange: (e)=>{
                                                setQuantity(Number(e.target.value));
                                            },
                                            max: 100,
                                            className: "border p-1 border-gray-300 text-center outline-0",
                                            min: 0,
                                            value: quantity
                                        }, void 0, false, {
                                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setQuantity((prev)=>prev + 1);
                                            },
                                            className: "px-2 border border-gray-300 border-l-transparent",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPlus"]
                                            }, void 0, false, {
                                                fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                                lineNumber: 219,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                            lineNumber: 213,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 py-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-white",
                                            onClick: async ()=>{
                                                await submitAddCart();
                                            },
                                            children: [
                                                "THÊM VÀO GIỎ HÀNG ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faCartPlus"]
                                                }, void 0, false, {
                                                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 35
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-white",
                                            onClick: async ()=>{
                                                await submitOrder();
                                            },
                                            children: [
                                                "MUA ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faShoppingBag"]
                                                }, void 0, false, {
                                                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                            lineNumber: 232,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$components$2f$product$2f$HashtagList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    tags: product.tags
                                }, void 0, false, {
                                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-gray-800 font-semibold mb-2 uppercase",
                            children: "sản phẩm cùng danh mục"
                        }, void 0, false, {
                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                            className: "mb-4"
                        }, void 0, false, {
                            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
            lineNumber: 175,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/components/product/page/SingleProductPage.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
_s(SingleProductPage, "rXyL0GwDRh3atRwoFRQwuiKHeo0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = SingleProductPage;
var _c;
__turbopack_context__.k.register(_c, "SingleProductPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=client_b10f3475._.js.map