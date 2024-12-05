"use client";

import Link from "next/link";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "@/lib/api/employee/employee.api";
import { IEmployee } from "@/lib/api/employee/employee.types";
import { useEffect } from "react";

export default function HomePage() {
  // Employee data fetching with React Query
  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: employeeApi.getEmployeeList,
    refetchOnMount: true,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }, [queryClient]);

  const handleCSV = () => {
    const objectToCsv = (data: Array<IEmployee>) => {
      const csvRows = [];
      const headers =
        "First Name,Last Name,Street,Nr,Zipcode,City,Country,Role";
      csvRows.push(headers);

      for (const employee of data) {
        const values = [
          employee.firstName,
          employee.lastName,
          employee.street,
          employee.housenumber,
          employee.zipcode,
          employee.city,
          employee.country,
          employee.role,
        ].map((value) => `"${String(value).replace(/"/g, '\\"')}"`);
        csvRows.push(values.join(","));
      }
      return csvRows.join("\n");
    };

    const download = (data: string) => {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", "ListOfEmployees.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    const csvData = objectToCsv(employees);
    download(csvData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading employees
      </div>
    );
  }

  return (
    <div className="flex flex-col item-center bg-gray-200 min-w-[375px]">
      <h1 className="pt-5 pl-10 block text-2xl font-medium text-[#07074D]">
        All Employees List
      </h1>
      <div className="flex p-2 justify-end mb-5 mr-10">
        <button
          className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-2 px-4 text-sm font-semibold text-white outline-none"
          onClick={handleCSV}
        >
          Download Employee List
        </button>
      </div>
      <ul>
        {employees.map((employee) => (
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
                <div className="flex flex-col w-full">
                  <div className="truncate text-ellipsis text-base md:text-xl font-semibold">
                    {employee.firstName} &nbsp;{employee.lastName}
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
        ))}
      </ul>
      <hr className="m-5" />
    </div>
  );
}
