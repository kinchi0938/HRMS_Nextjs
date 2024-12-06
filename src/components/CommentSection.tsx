import { useState } from "react";
import { IComment } from "@/types/comment.type";

interface CommentSectionProps {
  comments: IComment[];
  onSubmitComment: (text: string) => void;
  isSubmitting: boolean;
}

export default function CommentSection({
  comments,
  onSubmitComment,
}: CommentSectionProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitComment(comment);
    setComment("");
  };

  return (
    <div className="mx-auto w-full max-w-[550px] h-auto rounded-xl bg-white shadow-lg mt-10 p-5">
      <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
        Comments
      </h3>
      <div className="divide-y divide-gray-200">
        {comments?.map((comment, i) => (
          <div key={i} className="grid grid-cols-3">
            <div className="text-2xl col-span-2 break-all py-5">
              {comment.text}
            </div>
            <div className="flex flex-col py-5 pl-10">
              <div className="text-base font-semibold">{comment.author}</div>
              <div className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <hr className="bg-gray-700 my-5" />
        <form onSubmit={handleSubmit}>
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            htmlFor="comment"
          >
            New Comment
          </label>
          <textarea
            className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-3 px-8 text-base font-semibold text-white outline-none"
            type="submit"
          >
            Write Comment
          </button>
        </form>
      </div>
    </div>
  );
}
