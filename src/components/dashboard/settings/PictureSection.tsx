"use client";

import Button from "@/components/ui/Button";
import { uploadImage } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCamera, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

interface IProps {
  initialImage: string;
}

const PictureSection = ({ initialImage }: IProps) => {
  const { register, handleSubmit, reset } = useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSave = async (data: any) => {
    if (!data.picture || data.picture.length === 0) return;
    
    setIsLoading(true);
    try {
      // 1. Upload image to Cloudinary
      const imageUrl = await uploadImage(data.picture[0]);

      // 2. Save new image URL to database
      const res = await fetch(`/api/user/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageUrl }),
      });
      const resData = await res.json();
      
      if (!res.ok) throw new Error(resData.message);
      
      toast.success("Profile picture updated successfully!");
      setPreviewImage(null);
      reset(); // Clear file input
      router.refresh();
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="flex flex-col items-center gap-4 py-4 md:py-0">
      <label htmlFor="pictureImage" className="relative group cursor-pointer block">
        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30 group-hover:shadow-lg">
          <Image
            src={previewImage || initialImage || "/default-image.png"}
            alt="Profile Avatar"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="absolute inset-0 bg-black/40 rounded-full flex gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FiCamera className="text-white drop-shadow-md" size={24} />
        </div>
      </label>

      {/* Conditional UI based on state */}
      {!previewImage ? (
        <div className="text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            JPG, GIF or PNG. <br /> Max size of 2MB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 mt-2 w-full animate-in fade-in slide-in-from-bottom-2">
          <p className="text-xs font-semibold text-primary">New picture selected</p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-1.5 flex items-center gap-1.5 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              <FiX size={14} /> Cancel
            </Button>
            
            <Button
              type="submit"
              isLoading={isLoading}
              className="px-4 py-1.5 text-xs font-bold bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all"
            >
              Save Picture
            </Button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        id="pictureImage"
        type="file"
        accept="image/*"
        className="hidden"
        {...register("picture")}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const imageUrl = URL.createObjectURL(file);
          setPreviewImage(imageUrl);
          
          // Let react-hook-form know about the change
          register("picture").onChange(e);
        }}
      />
    </form>
  );
};

export default PictureSection;
