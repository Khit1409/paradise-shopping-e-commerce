import Link from "next/link";
import React from "react";

type ComponentProps = {
  tags: string[];
};

export default function HashtagList(props: ComponentProps) {
  const { tags } = props;
  return (
    <div className="flex gap-3 py-2 border-t border-gray-300 flex-wrap">
      {tags.map((tag, indexOfTag) => (
        <Link
          className="text-blue-600 hover:underline"
          key={indexOfTag}
          href={`/user/search/${tag.replace("#", "")}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
