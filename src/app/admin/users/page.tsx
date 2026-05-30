"use client";

import { useState } from "react";

import {
  Eye,
  Trash2,
  Search,
  X,
} from "lucide-react";

import useUser from "../../../hooks/useUser";

import {
  User,
  deleteUser,
} from "../../../services/userService";

export default function UsersPage() {

  const {
    users,
    fetchUsers,
  } = useUser();

  const [search, setSearch] =
    useState("");

  const [
    viewUser,
    setViewUser,
  ] = useState<User | null>(
    null
  );

  // DELETE
  const handleDelete =
    async (id: string) => {

      const confirmDelete =
        confirm(
          "Delete user?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteUser(id);

        fetchUsers();

      } catch (error) {
        console.log(error);
      }
    };

  // FILTER USERS
  const filteredUsers =
    Array.isArray(users)
      ? users.filter(
          (
            user: User
          ) =>
            user.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )
      : [];

  return (
    <div className="bg-white rounded-[25px] border border-gray-200 p-6">

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold text-black">

          Users

        </h1>

        {/* SEARCH */}
        <div className="relative">

          <Search
            size={18}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-gray-100 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-pink-500 w-[260px]"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl">

        <table className="w-full">

          {/* TABLE HEAD */}
          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Name

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Email

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Role

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Joined

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Actions

              </th>

            </tr>

          </thead>

          {/* TABLE BODY */}
          <tbody>

            {filteredUsers.map(
              (
                user: User
              ) => (
                <tr
                  key={
                    user._id
                  }
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* NAME */}
                  <td className="px-6 py-4 font-semibold text-black">

                    {user.name}

                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-gray-500">

                    {user.email}

                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                        user.role ===
                        "admin"
                          ? "bg-black text-white"
                          : user.role ===
                            "vendor"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >

                      {user.role}

                    </span>

                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-gray-500">

                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          setViewUser(
                            user
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                      >

                        <Eye
                          size={18}
                        />

                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            user._id
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-black text-white hover:bg-gray-900 flex items-center justify-center transition"
                      >

                        <Trash2
                          size={18}
                        />

                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* VIEW MODAL */}
      {viewUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

          <div className="bg-white w-full max-w-xl rounded-[25px] p-8 relative">

            {/* CLOSE */}
            <button
              onClick={() =>
                setViewUser(
                  null
                )
              }
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >

              <X size={18} />

            </button>

            {/* TITLE */}
            <h2 className="text-4xl font-bold text-black mb-8">

              User Details

            </h2>

            <div className="space-y-6">

              {/* NAME */}
              <div>

                <p className="text-sm text-gray-400">

                  Full Name

                </p>

                <h3 className="text-2xl font-bold text-black mt-2">

                  {viewUser.name}

                </h3>

              </div>

              {/* EMAIL */}
              <div>

                <p className="text-sm text-gray-400">

                  Email

                </p>

                <h3 className="text-xl font-semibold text-black mt-2">

                  {viewUser.email}

                </h3>

              </div>

              {/* ROLE */}
              <div>

                <p className="text-sm text-gray-400">

                  Role

                </p>

                <div className="mt-3">

                  <span
                    className={`px-5 py-2 rounded-full text-sm font-semibold capitalize ${
                      viewUser.role ===
                      "admin"
                        ? "bg-black text-white"
                        : viewUser.role ===
                          "vendor"
                        ? "bg-pink-100 text-pink-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >

                    {
                      viewUser.role
                    }

                  </span>

                </div>

              </div>

              {/* JOINED */}
              <div>

                <p className="text-sm text-gray-400">

                  Joined Date

                </p>

                <h3 className="text-lg font-medium text-black mt-2">

                  {new Date(
                    viewUser.createdAt
                  ).toLocaleDateString()}

                </h3>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}