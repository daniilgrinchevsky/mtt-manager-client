import React from "react";
import useActiveLink from "./useActiveLink";
import {Menu} from "lucide-react";

// Image

const NavbarButton = () => {

    const { activeLink, handleLinkClick } = useActiveLink(".navbar-menu li.active");

    return (
        <React.Fragment>
            <nav className="group-data-[skin=bordered]:shadow-sm group-data-[skin=bordered]:border group-data-[skin=bordered]:border-slate-200 group-data-[skin=bordered]:dark:border-zink-500 flex items-center h-16 px-4 py-2 bg-white rounded-md shadow-md  dark:bg-zink-700 navbar">
                <div className="columns-1 justify-center items-center">
                    <ul id="navbar5"
                        className="absolute inset-x-0 z-20 items-center hidden py-3 mx-auto bg-white shadow-lg dark:bg-zink-600 dark:md:bg-transparent md:z-0 navbar-menu rounded-b-md md:shadow-none md:flex top-full md:relative md:bg-transparent md:rounded-none md:top-auto md:py-0">
                        <li>
                            <a href="/tourneys"
                               className={`block md:inline-block px-4 md:px-3 py-2.5 md:py-0.5 text-15 font-medium text-slate-800 transition-all duration-300 ease-linear hover:text-custom-500 [&.active]:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500 dark:[&.active]:text-custom-500 acti ${activeLink === "/Home" ? "active" : ""}`}
                               onClick={() => handleLinkClick("/tourneys")}
                            >Турниры</a>
                        </li>
                        <li>
                            <a href="/session"
                               className={`block md:inline-block px-4 md:px-3 py-2.5 md:py-0.5 text-15 font-medium text-slate-800 transition-all duration-300 ease-linear hover:text-custom-500 [&.active]:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500 dark:[&.active]:text-custom-500 acti ${activeLink === "/Home" ? "active" : ""}`}
                               onClick={() => handleLinkClick("/session")}
                            >Сессия</a>
                        </li>
                        <li>
                            <a href="/analytics"
                               className={`block md:inline-block px-4 md:px-3 py-2.5 md:py-0.5 text-15 font-medium text-slate-800 transition-all duration-300 ease-linear hover:text-custom-500 [&.active]:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500 dark:[&.active]:text-custom-500 acti ${activeLink === "/Home" ? "active" : ""}`}
                               onClick={() => handleLinkClick("/analytics")}
                            >Аналитика</a>
                        </li>
                    </ul>
                    {/*<ul className="flex items-center ltr:ml-auto rtl:mr-auto">*/}
                    {/*    <li>*/}
                    {/*        <a href="#!" className="inline-flex items-center justify-center size-10 transition-all duration-300 ease-linear tems-center text-slate-500 hover:text-custom-500 active:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:active:text-custom-500 group/item">*/}
                    {/*            <ShoppingBag className="size-4 fill-slate-50 dark:fill-zink-500 group-hover/item:fill-custom-50 dark:group-hover/item:fill-custom-500/20"/>*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="#!" className="inline-flex items-center justify-center size-10 transition-all duration-300 ease-linear tems-center text-slate-500 hover:text-custom-500 active:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:active:text-custom-500 group/item">*/}
                {/*            <Bell className="size-4 fill-slate-50 dark:fill-zink-500 group-hover/item:fill-custom-50 dark:group-hover/item:fill-custom-500/20"/>*/}
                {/*            </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="#!" className="inline-flex items-center justify-center size-10 transition-all duration-300 ease-linear tems-center text-slate-500 hover:text-custom-500 active:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:active:text-custom-500 group/item">*/}
                {/*            <UserCircle className="size-4 fill-slate-50 dark:fill-zink-500 group-hover/item:fill-custom-50 dark:group-hover/item:fill-custom-500/20"/>*/}
                {/*            </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
                </div>
                <div className="md:hidden navbar-toggale-button">
                    <button type="button" className="flex items-center  justify-center size-[37.5px] p-0 text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><Menu /></button>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavbarButton;
