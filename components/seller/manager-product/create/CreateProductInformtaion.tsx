import { CREATE_INFORMATION_FORM } from "./create-product-information";

type ComponentProps = {
  onchange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function CreateProductInformtaion(props: ComponentProps) {
  const { onchange } = props;
  return (
    <section className="mb-3">
      <h5 className="font-bold mb-3">THÔNG TIN SẢN PHẨM</h5>
      <div className="w-full flex flex-col gap-3">
        {/* input information */}
        {CREATE_INFORMATION_FORM.map((m) => (
          <div key={m.id} className="flex flex-col gap-1">
            <label htmlFor={m.id} className="font-normal uppercase">
              {m.title}
            </label>
            {m.type === "textarea" ? (
              <textarea
                name={m.name}
                id={m.id}
                required={m.required}
                onChange={(e) => {
                  onchange(e);
                }}
                className="min-h-[200px] border border-gray-300 outline-0 p-1 text-gray-700"
              />
            ) : (
              <input
                type={m.type}
                id={m.id}
                name={m.name}
                required={m.required}
                onChange={(e) => {
                  onchange(e);
                }}
                className={` border border-gray-300 outline-0 p-1 text-gray-700`}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
