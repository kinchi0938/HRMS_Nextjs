import { IEmployee } from "@/types/employee.type";

interface ProfileInfoProps {
  employee: IEmployee;
}

export default function ProfileInfo({ employee }: ProfileInfoProps) {
  return (
    <div className="mx-auto w-full max-w-[550px] h-auto rounded-xl bg-white shadow-lg">
      <div className="flex flex-col">
        <div className="grid grid-cols-4 p-5">
          <div className="grid grid-rows-6 mr-5 min-w-min">
            <div className="text-sm font-bold">Full Name</div>
            <div className="text-sm font-bold">Email</div>
            <div className="text-sm font-bold row-span-2">Address</div>
            <div className="text-sm font-bold">Role</div>
          </div>
          <div className="grid grid-rows-6 col-span-3">
            <div className="truncate">
              {employee.firstName} {employee.lastName}
            </div>
            <div className="truncate">{employee.email}</div>
            <div className="truncate">
              {employee.housenumber}, {employee.street}
            </div>
            <div className="truncate">
              {employee.zipcode}, {employee.city}, {employee.country}
            </div>
            <div className="truncate">{employee.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
