import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
    AiOutlineHeart,
    AiOutlineSearch,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    //   const { isSeller } = useSelector((state) => state.seller);
    //   const { wishlist } = useSelector((state) => state.wishlist);
    //   const { cart } = useSelector((state) => state.cart);
    //   const { allProducts } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredProducts = productData && productData.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );

        // const filteredProducts =
        //   allProducts &&
        //   allProducts.filter((product) =>
        //     product.name.toLowerCase().includes(term.toLowerCase())
        //   );
        setSearchData(filteredProducts);
    };

    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });

    return (
        <>
            <div className={`${styles.section}`}>
                <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <img className="w-1/2 h-auto"
                                src="data:image/png;base64,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"
                                alt=""
                            />
                        </Link>
                    </div>
                    {/* search box */}
                    <div className="w-[50%] relative">
                        <input
                            type="text"
                            placeholder="Search Product..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                        />
                        <AiOutlineSearch
                            size={30}
                            className="absolute right-2 top-1.5 cursor-pointer"
                        />
                        {searchData && searchData.length !== 0 ? (
                            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                {searchData &&
                                    searchData.map((i, index) => {
                                        const d = i.name;
                                        const Product_name = d.replace(/\s+/g, "-");
                                        return (
                                            <Link to={`/product/${Product_name}`}>
                                                <div className="w-full flex items-start-py-3">
                                                    <img
                                                        src={i.image_Url[0].url}
                                                        alt=""
                                                        className="w-[40px] h-[40px] mr-[10px]"
                                                    />
                                                    <h1>{i.name}</h1>
                                                </div>
                                            </Link>
                                        );
                                    })}
                            </div>
                        ) : null}
                    </div>

                    <div className={`${styles.button}`}>
                        <Link to="/shop-create">
                            <h1 className="text-[#fff] flex items-center">
                                Become Seller <IoIosArrowForward className="ml-1" />
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
                <div
                    className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
                    {/* categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                            <button
                                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}>
                                All Categories
                            </button>
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-4 cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                            {dropDown ? (
                                <DropDown
                                    categoriesData={categoriesData}
                                    setDropDown={setDropDown}
                                />
                            ) : null}
                        </div>
                    </div>
                    {/* navitems */}
                    <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading} />
                    </div>

                    <div className="flex">
                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[15px]"
                                onClick={() => { setOpenWishlist(true) }}>
                                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                </span>
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[15px]"
                                onClick={() => { setOpenCart(true) }}>
                                <AiOutlineShoppingCart
                                    size={30}
                                    color="rgb(255 255 255 / 83%)"
                                />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                </span>
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                {isAuthenticated ? (
                                    <Link to="/profile">
                                        <img
                                            src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:3500/${user.avatar}`}
                                            alt=""
                                            className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                                        />
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* cart popup */}
                        {openCart ? (
                            <Cart setOpenCart={setOpenCart} />
                        ) : null}

                        {/* wishlist popup */}
                        {openWishlist ? (
                            <Wishlist setOpenWishlist={setOpenWishlist} />
                        ) : null}
                    </div>
                </div>
            </div>

            {/* mobile header */}
            <div
                className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    }
    w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
            >
                <div className="w-full flex items-center justify-between">
                    <div>
                        <BiMenuAltLeft
                            size={40}
                            className="ml-4"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                    <div>
                        <Link to="/">
                            <img
                                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                                alt=""
                                className="mt-3 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div>
                        <div
                            className="relative mr-[20px]"
                        >
                            <AiOutlineShoppingCart size={30} />
                            <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                1
                            </span>
                        </div>
                    </div>

                </div>

                {/* header sidebar */}
                {open && (
                    <div
                        className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
                    >
                        <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                            <div className="w-full justify-between flex pr-3">
                                <div>
                                    <div
                                        className="relative mr-[15px]"
                                    >
                                        <AiOutlineHeart size={30} className="mt-5 ml-3" />
                                        <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                            0
                                        </span>
                                    </div>
                                </div>
                                <RxCross1
                                    size={30}
                                    className="ml-4 mt-5"
                                    onClick={() => setOpen(false)}
                                />
                            </div>

                            <div className="my-8 w-[92%] m-auto h-[40px relative]">
                                <input
                                    type="search"
                                    placeholder="Search Product..."
                                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                {searchData && (
                                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                                        {searchData.map((i) => {
                                            const d = i.name;

                                            const Product_name = d.replace(/\s+/g, "-");
                                            return (
                                                <Link to={`/product/${Product_name}`}>
                                                    <div className="flex items-center">
                                                        <img
                                                            src={i.image_Url[0]?.url}
                                                            alt=""
                                                            className="w-[50px] mr-2"
                                                        />
                                                        <h5>{i.name}</h5>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <Navbar active={activeHeading} />
                            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                                <Link to="/shop-create">
                                    <h1 className="text-[#fff] flex items-center">
                                        Become Seller <IoIosArrowForward className="ml-1" />
                                    </h1>
                                </Link>
                            </div>
                            <br />
                            <br />

                            <div className="flex w-full justify-center">
                                <Link to="/login" className="text-[18px] pr-[10px] text-[#000000b7]">Login / </Link>
                                <Link to="/login" className="text-[18px] text-[#000000b7]">SignUp</Link>
                            </div>

                            <br />
                            <br />

                            <div className="flex w-full justify-center">
                                {isAuthenticated ? (
                                    <div>
                                        <Link to="/profile">
                                            <img
                                                src={`http://localhost:3500/api/${user.avatar}`}
                                                alt=""
                                                className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                                            />
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="text-[18px] pr-[10px] text-[#000000b7]"
                                        >
                                            Login /
                                        </Link>
                                        <Link
                                            to="/sign-up"
                                            className="text-[18px] text-[#000000b7]"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;
