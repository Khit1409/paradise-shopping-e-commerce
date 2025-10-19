"use client";

/**
 * Component props
 */
type ComponentProps = {
  title: "hello";
};
/**
 * function component
 * @returns
 */
export default function CarouselSection({ ...props }: ComponentProps) {
  return <div>{props.title}</div>;
}
