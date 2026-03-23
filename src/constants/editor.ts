import { FiBold, FiCode, FiImage, FiItalic, FiLink, FiList } from "react-icons/fi";
import { LuHeading1, LuHeading2, LuHeading3, LuListOrdered, LuQuote } from "react-icons/lu";

export const TOOLBAR_BUTTONS = [
  { icon: LuHeading1, label: "Heading 1", markdownSyntax: "# " },
  { icon: LuHeading2, label: "Heading 2", markdownSyntax: "## " },
  { icon: LuHeading3, label: "Heading 3", markdownSyntax: "### " },
  { divider: true },
  { icon: FiBold, label: "Bold", markdownSyntax: "**bold text**" },
  { icon: FiItalic, label: "Italic", markdownSyntax: "*italic text*" },
  { icon: FiCode, label: "Code", markdownSyntax: "`code snippet`" },
  { divider: true },
  { icon: FiList, label: "Bullet list", markdownSyntax: "\n- " },
  { icon: LuListOrdered, label: "Ordered list", markdownSyntax: "\n1. " },
  { icon: LuQuote, label: "Blockquote", markdownSyntax: "\n> " },
  { divider: true },
  { icon: FiLink, label: "Link", markdownSyntax: "[title](url)" },
  { icon: FiImage, label: "Image", markdownSyntax: "![alt text](image-url)" },
];
