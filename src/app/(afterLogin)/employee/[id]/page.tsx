"use client";

import { IComment } from "@/app/types/comment.type";
import { IEmployee } from "@/app/types/employee.type";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Profile() {
  //get Employee for Current Profile
  const getThisEmployee = {
    _id: "5",
    username: "Garrick55",
    password: "5mxufFCJZoVoAvC",
    firstName: "Darby",
    lastName: "Konopelski",
    email: "Jordane.Stokes56@gmail.com",
    street: "Ellis Common",
    housenumber: "83471",
    zipcode: 58313,
    city: "Lake Lydaborough",
    country: "Japan",
    role: "orchestrate virtual mindshare",
    comments: [],
  };
  // will change to function

  const [profileEmployee, setProfileEmployee] = useState<IEmployee | null>(
    getThisEmployee
  );
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[] | null | undefined>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setComments(profileEmployee?.comments);
  }, [setComments, profileEmployee]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleDelete = () => {};

  return (
    <>
      <div className="p-10 h-auto w-screen flex flex-col items-center bg-gray-100">
        <h3 className="truncate text-3xl font-bold mb-5 max-w-[550px]">
          Profile of {profileEmployee?.firstName} {profileEmployee?.lastName}
        </h3>
        <div className="mx-auto w-full max-w-[550px] h-auto rounded-xl bg-white shadow-lg">
          <div className="flex flex-col">
            <div className="grid grid-cols-4 p-5">
              <div className="grid grid-rows-6 mr-5 min-w-min">
                <div className="text-sm font-bold">User Name</div>
                <div className="text-sm font-bold">Full Name</div>
                <div className="text-sm font-bold">Email</div>
                <div className="text-sm font-bold row-span-2">Address</div>
                <div className="text-sm font-bold">Role</div>
              </div>
              <div className="grid grid-rows-6 col-span-3">
                {profileEmployee ? (
                  <>
                    <div className="truncate">
                      {profileEmployee?.firstName} {profileEmployee?.lastName}
                    </div>
                    <div className="truncate">{profileEmployee?.email}</div>
                    <div className="truncate">
                      {profileEmployee?.housenumber}, {profileEmployee?.street}
                    </div>
                    <div className="truncate">
                      {profileEmployee?.zipcode + ","}{" "}
                      {profileEmployee?.city + ","} {profileEmployee?.country}
                    </div>
                    <div className="truncate">{profileEmployee?.role}</div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <Link
                className="flex justify-center mx-5 rounded-md bg-blue-500 hover:bg-blue-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
                href={`/employee/edit/${profileEmployee?._id}`}
              >
                Edit
              </Link>
              <button
                className="mx-5 rounded-md bg-red-500 hover:bg-red-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
                onClick={() => setShow(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[550px] h-auto rounded-xl bg-white shadow-lg mt-10 p-5">
          <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
            Comments
          </h3>
          <div className="divide-y divide-gray-200">
            {comments ? (
              comments.map((comment, i) => {
                return (
                  <div key={i} className="grid grid-cols-3">
                    <div className="text-2xl col-span-2 break-all py-5">
                      {comment.text}
                    </div>
                    <div className="flex flex-col py-5 pl-10">
                      <div className="text-base font-semibold">
                        {comment.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        {comment.createdAt.split("T")[0]}{" "}
                        {comment.createdAt.split("T")[1].substring(0, 5)}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <hr className="bg-gray-700 my-5" />
            <form onSubmit={handleSubmit}>
              <label
                className="mb-3 block text-base font-medium text-[#07074D]"
                htmlFor="comment"
              >
                New Comment{" "}
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
      </div>
      {show && (
        <div className="fixed inset-0 w-full h-screen flex justify-center items-center bg-gray-400 bg-opacity-50">
          <div className="relative p-5 bg-white">
            <h3 className="mb-8 block text-2xl font-medium text-[#07074D]">
              Are you Sure?
            </h3>
            <div className="flex ">
              <button
                className="mx-5 rounded-md bg-blue-500 hover:bg-blue-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
                onClick={() => {
                  setShow(false);
                }}
              >
                No, I don&apos;t want to Delete
              </button>
              <button
                className="mx-5 rounded-md bg-red-500 hover:bg-red-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
                onClick={() => {
                  handleDelete();
                }}
              >
                Yes, I want to Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
