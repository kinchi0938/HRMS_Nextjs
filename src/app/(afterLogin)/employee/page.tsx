"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { IEmployee } from "@/app/types/employee.type";

async function fetchEmployees() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function EmployeeList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["employeeList"],
    queryFn: () => fetchEmployees(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCSV = () => {};

  return (
    <div className="flex flex-col item-center bg-gray-200 min-w-[375px]">
      <h1 className="pt-5 pl-10 block text-2xl font-medium text-[#07074D]">
        All Employees List
      </h1>
      <div className="flex p-2 justify-end mb-5 mr-10">
        <button
          className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-2 px-4 text-sm font-semibold text-white outline-none"
          onClick={() => handleCSV()}
        >
          Download Employee List
        </button>
      </div>
      <ul className="">
        {data?.map((employee: IEmployee) => {
          return (
            <li key={employee._id} className="mx-10 my-2">
              <div className="flex flex-col md:grid md:grid-cols-4 md:max-w-full p-5 rounded-xl bg-white p-4 shadow-lg">
                <div className="flex md:col-span-3 w-3/4">
                  <div className="flex mr-10 h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col w-full ">
                    <div className="truncate text-ellipsis text-base md:text-xl font-semibold">
                      {employee.firstName} &nbsp;
                      {employee.lastName}
                    </div>
                    <p className="truncate text-ellipsis text-sm md:text-base text-gray-300">
                      {employee.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-5 md:mt-0">
                  <Link
                    className="flex items-center hover:shadow-form mr-5 rounded-md bg-amber-500 hover:bg-amber-400 py-2 px-4 text-sm font-semibold text-white outline-none"
                    href={`/employee/${employee._id}`}
                  >
                    Profile
                  </Link>
                  <Link
                    className="flex items-center hover:shadow-form rounded-md bg-amber-500 hover:bg-amber-400 py-2 px-4 text-sm font-semibold text-white outline-none"
                    href={`/employee/edit/${employee._id}`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="m-5" />
    </div>
  );
}
