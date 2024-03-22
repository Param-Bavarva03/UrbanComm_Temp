const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Event = require("../model/event");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const { upload } = require("../multer");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(400).json({ message: "Shop Id is invalid!" });
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images= imageUrls;
        eventData.shop= shop;

        const product = await Event.create(eventData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return res.status(400).json({ message: `error is: ${error.message}` });
    }
  })
);

// // get all events
// router.get("/get-all-events", async (req, res, next) => {
//   try {
//     const events = await Event.find();
//     res.status(201).json({
//       success: true,
//       events,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error, 400));
//   }
// });

// // get all events of a shop
// router.get(
//   "/get-all-events/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const events = await Event.find({ shopId: req.params.id });

//       res.status(201).json({
//         success: true,
//         events,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// // delete event of a shop
// router.delete(
//   "/delete-shop-event/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const event = await Event.findById(req.params.id);

//       if (!product) {
//         return next(new ErrorHandler("Product is not found with this id", 404));
//       }    

//       for (let i = 0; 1 < product.images.length; i++) {
//         const result = await cloudinary.v2.uploader.destroy(
//           event.images[i].public_id
//         );
//       }
    
//       await event.remove();

//       res.status(201).json({
//         success: true,
//         message: "Event Deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// // all events --- for admin
// router.get(
//   "/admin-all-events",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const events = await Event.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         events,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;
