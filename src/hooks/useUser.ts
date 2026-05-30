import { useEffect } from "react";

import { useState } from "react";

import {
  getUsers,
  User,
} from "../services/userService";

export default function useUser() {

  const [
    users,
    setUsers,
  ] = useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const data =
          await getUsers();

        setUsers(data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
  };
}