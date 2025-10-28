import { getCategory } from "@/lib/api";
import css from "../../../../components/SidebarNotes/SidebarNotes.module.css";
import Link from "next/link";

const SidebarNotes = async () => {
  const categories = await getCategory();
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.id} className={css.menuItem}>
          <Link href={`/notes/filter/${category.id}`} className={css.menuLink}>
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
