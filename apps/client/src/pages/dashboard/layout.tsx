import { SidebarSimple } from "@phosphor-icons/react";
import { Button, Sheet, SheetClose, SheetContent, SheetTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";

import { z } from "zod";
import { axios } from "@/client/libs/axios";
import { useLogin, useRegister, useLogout, logout } from "@/client/services/auth";
import { loginSchema, registerSchema } from "@reactive-resume/dto";

import { Sidebar } from "./_components/sidebar";

type registerFormValues = z.infer<typeof registerSchema>;
type loginFormValues = z.infer<typeof loginSchema>;

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const { login } = useLogin();
  const { register } = useRegister();
  const { logout } = useLogout();

  const fetchAllUsersData = async () => {
    try {
      const response = await axios.get(
        "https://www.interviewaxis.com/api/v1/user-data",
        { withCredentials: true }
      );

      console.log("fetchAllUsersData : ", response.data.data);

      if (response.status >= 200 && response.status < 300) {
        return Array.isArray(response.data.data) ? response.data.data : [];
      } else {
        throw new Error("Failed to fetch users data");
      }
    } catch (error) {
      console.error("Error fetching users data:", error);
      return [];
    }
  };

  const checkSessionStatus = async () => {
    try {
      const response = await fetch('https://www.interviewaxis.com/api/v1/check-session', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log("checkSessionStatus : ", data);

      return data;
    } catch (error) {
      console.error("Error checking session status:", error);
      return null;
    }
  };

  const resetCredentials = async () => {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.interviewaxis.com;`;
    });
  
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("twk_")) {
        localStorage.removeItem(key);
      }
    });
  
    window.location.href = "https://www.interviewaxis.com/login";
  };

  const processSessionData = async () => {
    const usersData = await fetchAllUsersData();
    const sessionData = await checkSessionStatus();

    if (sessionData && sessionData.logged_in === true) {
      const loggedInUser = sessionData.user;
      const matchedUser = usersData.find((user: any) => user.id === loggedInUser.id);

      if (matchedUser) {
        localStorage.setItem("user_data", JSON.stringify({
          user_id: matchedUser.id,
          user_name: matchedUser.name,
          user_role: loggedInUser.role,
          user_email: loggedInUser.email,
        }));
      } else {
        console.error("User data not found in users data");
      }
    } else {
      resetCredentials();
    }
  };

  const hashUserData = async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        await processSessionData();
        const hashedPassword = await hashUserData(localStorage.getItem('user_data') ?? "password");

        const user_data = JSON.parse(localStorage.getItem('user_data') ?? "{}");

        try {
          await logout();
        } catch {
          console.log("Could not logout user")
        }

        try {
          const login_data: loginFormValues = {
            identifier: user_data.user_email,
            password: hashedPassword,
          };
          await login(login_data);
        } catch {
          const register_data: registerFormValues = {
            name: user_data.user_name,
            username: user_data.user_name.toLowerCase().replace(/\s+/g, '_'),
            email: user_data.user_email,
            password: hashedPassword,
            locale: "en-US",
          };
          await register(register_data);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        window.location.href = "https://www.interviewaxis.com/login";
      } finally {
        setLoading(false); // Set loading to false after authentication is complete
      }
    };

    authenticateUser();
  }, [login, register]);

  // Show a loading indicator while authentication is in progress
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Render the page content only after authentication is complete
  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 pb-0 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="bg-background">
              <SidebarSimple />
            </Button>
          </SheetTrigger>

          <SheetContent showClose={false} side="left" className="focus-visible:outline-none">
            <SheetClose asChild className="absolute left-4 top-4">
              <Button size="icon" variant="ghost">
                <SidebarSimple />
              </Button>
            </SheetClose>

            <Sidebar setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>

      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[320px] lg:flex-col"
      >
        <div className="h-full rounded p-4">
          <Sidebar />
        </div>
      </motion.div>

      <main className="mx-6 my-4 lg:mx-8 lg:pl-[320px]">
        <Outlet />
      </main>
    </div>
  );
};