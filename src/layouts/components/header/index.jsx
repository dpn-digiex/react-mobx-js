import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ROUTES_APP } from "@constants";

import styles from "./index.module.scss";

const HEADER_NAVIGATION = [
  {
    id: "page-one",
    path: ROUTES_APP.PAGE_ONE,
    title: "PageOne",
  },
  {
    id: "page-two",
    path: ROUTES_APP.PAGE_TWO,
    title: "PageTwo",
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen(p => !p);
  };

  const ctaClickHandler = () => {
    menuToggleHandler();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to={ROUTES_APP.ROOT} className={styles.header__content__logo}>
          Logo
        </Link>
        <nav
          className={`${styles.header__content__nav} ${
            menuOpen && size.width < 768 ? styles.isMenu : ""
          }`}
        >
          <ul>
            {HEADER_NAVIGATION.map(item => (
              <li key={item.id}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <button onClick={ctaClickHandler}>CTA Page</button>
        </nav>
        <div className={styles.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
