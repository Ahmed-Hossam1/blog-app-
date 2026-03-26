"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { FiLock } from "react-icons/fi";
import MyInput from "@/components/ui/Input";

interface PasswordUpdateSectionProps {
  userId: string;
}

export default function PasswordUpdateSection({
  userId,
}: PasswordUpdateSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdate = async () => {
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/user/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Password updated successfully");
        setShowForm(false);
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(result.message || "Failed to update password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
          Password
        </label>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 flex items-center gap-2 w-full justify-center transition hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FiLock size={16} /> Update Password
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">Current Password</label>
        <MyInput
          type="password"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">New Password</label>
        <MyInput
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">Confirm Password</label>
        <MyInput
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          onClick={() => setShowForm(false)}
          className="flex-1 bg-white dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          isLoading={loading}
          className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm shadow-md"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
