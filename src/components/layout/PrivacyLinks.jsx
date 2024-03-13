import { footerPrivacyData } from "@/config/data";
import Link from "next/link";

const PrivacyLinks = () => {
  return (
    <>
      {footerPrivacyData.map((items) => (
        <li
          className="textSecondary_lightDark hover:underline"
          key={items.label}
        >
          <Link href={items.link} target={items.target}>
            {items.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default PrivacyLinks;
