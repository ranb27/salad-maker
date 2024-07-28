"use strict";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

// Define the type for the user data
interface User {
  userEmail: string;
}

// Create the Supabase client
const supabase = createClient();

const UserEmailFetcher = () => {
  const [data, setData] = useState<User>({ userEmail: "" });

  useEffect(() => {
    const fetchUser = async () => {
      // Check if the user is authenticated
      const user = supabase.auth.getUser();
      if (!user) {
        console.error("Error fetching user: Auth session missing!");
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error) {
        // console.error("Error fetching user:", error);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        userEmail: data.user?.email || "",
      }));
    };

    fetchUser();
  }, []);

  return data.userEmail;
};

export default UserEmailFetcher;
