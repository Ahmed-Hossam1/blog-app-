"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import MyInput from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface EmailUpdateSectionProps {
  initialEmail: string;
  userId: string;
}

import { FiEdit2 } from "react-icons/fi";

export default function EmailUpdateSection({
  initialEmail,
  userId,
}: EmailUpdateSectionProps) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/user/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Email updated successfully");
        setIsEditing(false);
      } else {
        toast.error(result.message || "Failed to update email");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <FiEdit2 size={14} />
            <span>Change</span>
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <MyInput
          type="email"
          placeholder="john@example.com"
          value={email}
          disabled={!isEditing}
          onChange={(e) => setEmail(e.target.value)}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {isEditing && (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEmail(initialEmail);
                setIsEditing(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              isLoading={loading}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md"
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
