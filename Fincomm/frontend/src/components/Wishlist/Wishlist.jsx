import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";


const Wishlist = ({ setOpenWishlist }) => {
  // const { cart } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  // const removeFromCartHandler = (data) => {
  //   dispatch(removeFromCart(data));
  // };

  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice,
  //   0
  // );

  // const quantityChangeHandler = (data) => {
  //   dispatch(addTocart(data));
  // };

  const cartdata = [
    {
      name: "llllllll",
      description: "test",
      price: 999
    },
    {
      name: "dddddddd",
      description: "test",
      price: 9999
    },
    {
      name: "dddddddddd",
      description: "test",
      price: 99999
    },
  ]

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
        </div>

        <div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              3 items
            </h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartdata &&
              cartdata.map((i, index) => (
                <CartSingle
                  key={index}
                  data={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center flex-grow">
        <RxCross1 size={15} className="mr-2 cursor-pointer" />
        <img
          src="https://pixlr.com/images/index/ai-image-generator-one.webp"
          alt=""
          className="w-24 h-auto rounded-md mr-4"
        />
        <div className="flex flex-col flex-grow">
          <h1 className="text-lg font-semibold whitespace-normal break-words">{data.name}</h1>
          <h4 className="text-red-600 font-semibold text-sm mt-1">US${totalPrice}</h4>
        </div>
      </div>
      <div>
        <BsCartPlus size={20} className="cursor-pointer" title="Add to cart" />
      </div>
    </div>

  );
};

export default Wishlist;