import React from "react";

type ComponentProps = {
  title: string;
};

export default function BorderLine({ ...props }: ComponentProps) {
  return (
    <section className="text-gray-700 py-2">
      <h4 className="font-bold uppercase">{props.title}</h4>
      <hr />
    </section>
  );
}
