import { INavLinks } from "@/types";
import { HiOutlineBookmark, HiOutlineChartBar, HiOutlineDocumentText, HiOutlinePencilSquare, HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdOutlineArticle } from "react-icons/md";

export const navLinksData: INavLinks[] = [
  { id: 1, name: "Home", to: "/" },
  { id: 2, name: "Blogs", to: "/blog" },
  { id: 3, name: "Authors", to: "/authors" },
  { id: 4, name: "Contact", to: "/contact" },
];

export const asideLinksData = [
  { name: "Overview", icon: HiOutlineSquares2X2, href: "/dashboard" },
  { name: "Manage Blogs", icon: MdOutlineArticle, href: "/dashboard/manage-blogs" },
  { name: "editor", icon: HiOutlinePencilSquare, href: "/dashboard/editor" },
  { name: "Draft", icon: HiOutlineDocumentText, href: "/dashboard/draft" },
  { name: "Bookmarks", icon: HiOutlineBookmark, href: "/dashboard/bookmarks" },
  { name: "Analytics", icon: HiOutlineChartBar, href: "/dashboard/analytics" },
];

export const FOOTER_QUICK_LINKS = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Contact", href: "/contact" },
];
