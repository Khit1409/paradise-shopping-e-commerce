import React from "react";

type ComponentProps = {
  title: string;
};

export default function BorderLine({ ...props }: ComponentProps) {
  return (
    <section className="text-[orangered] px-2">
      <h4>{props.title}</h4>
      <hr />
    </section>
  );
}
