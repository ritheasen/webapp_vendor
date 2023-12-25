const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const multer = require("multer");
var fs = require("fs");
var path = require("path");
const { createCanvas, loadImage } = require("canvas");

// Set up storage for multer
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// Set up multer with the storage configuration
const upload = multer({ storage: Storage }).single("imageUrl");

// @desc    User post product
// @route   POST /api/products/create
// @access  Authenticated

const createProduct = asyncHandler(async (req, res) => {
  // upload(req, res,(err)=> {
  //     if(err){
  //         console.log(err);
  //     } else {
  //         const product = new Product({
  //             title: req.body.title,
  //             description: req.body.description,
  //             price: req.body.price,
  //             quantity: req.body.quantity,
  //             imageUrl: {data: req.file.filename, contentType: 'image/png'},
  //             userId: req.user._id
  //         })

  //         product.save()
  //         .then(()=>res.send('Product added!')).catch((err)=>res.status(400).send(err))
  //     }
  // })

  // upload(req, res, (err) => {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         // Read the image file and convert it to base64
  //         const imageBuffer = fs.readFileSync(`uploads/${req.file.filename}`);
  //         const base64Image = imageBuffer.toString('base64');

  //         // Save the product with base64 image in MongoDB
  //         const product = new Product({
  //             title: req.body.title,
  //             description: req.body.description,
  //             price: req.body.price,
  //             quantity: req.body.quantity,
  //             imageUrl: { data: base64Image, contentType: 'image/png' },
  //             userId: req.user._id
  //         });

  //         product.save()
  //             .then(() => res.send('Product added!'))
  //             .catch((err) => res.status(400).send(err));
  //     }
  // });

  // upload(req, res, async (err) => {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         try {
  //             // Load the image using canvas
  //             const image = await loadImage(`uploads/${req.file.filename}`);

  //             // Create a canvas with the same dimensions as the image
  //             const canvas = createCanvas(image.width, image.height);
  //             const ctx = canvas.getContext('2d');

  //             // Draw the image onto the canvas
  //             ctx.drawImage(image, 0, 0);

  //             // Convert the canvas to a Base64-encoded PNG
  //             const base64Image = canvas.toDataURL('image/png');

  //             // Save the product with the Base64-encoded image in MongoDB
  //             const product = new Product({
  //                 title: req.body.title,
  //                 description: req.body.description,
  //                 price: req.body.price,
  //                 quantity: req.body.quantity,
  //                 imageUrl: { data: base64Image, contentType: 'image/png' },
  //                 userId: req.user._id
  //             });

  //             product.save()
  //                 .then(() => res.send('Product added!'))
  //                 .catch((err) => res.status(400).send(err));
  //         } catch (error) {
  //             console.error(error);
  //             res.status(500).send('Internal Server Error');
  //         }
  //     }
  // });

  const { title, description, price, quantity, imageUrl } = req.body;

  if (!title || !description || !price) {
    throw new BadRequestError("Please fill all fields");
  }

  // Get the user's email from the authenticated user
  const userId = req.user._id;

  // Create product
  const product = await Product.create({
    title,
    description,
    price,
    quantity,
    imageUrl,
    // comments,
    // review,
    userId,
  });

  if (product) {
    res.status(201).json({
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      comments: product.comments,
      review: product.review,
      userId: product.userId,
    });
  } else {
    throw new BadRequestError("Invalid product data");
  }
});

const createProductt = asyncHandler(async (req, res) => {
  // Use the upload middleware to handle the file upload
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.log(err, "Error uploading file");
    }

    // Now req.file contains the uploaded file information
    const { title, description, price, quantity } = req.body;
    const imageUrl = req.file ? path.join("uploads", req.file.filename) : null;

    if (!title || !description || !price) {
      console.log("Please fill all fields ");
    }

    if (!imageUrl) {
      console.log("Please upload an image");
    }

    // Get the user's email from the authenticated user
    const userId = req.user._id;

    // Create product
    const product = await Product.create({
      title,
      description,
      price,
      quantity,
      imageUrl,
      userId,
    });

    if (product) {
      res.status(201).json({
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        comments: product.comments,
        review: product.review,
        userId: product.userId,
      });
    } else {
      throw new BadRequestError("Invalid product data");
    }
  });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Authenticated
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get product owned by userId
// @route   GET /api/products/ofuser/:userId
// @access  Authenticated
const getProductOwnedBySpecificUser = asyncHandler(async (req, res) => {
  const product = await Product.find({ userId: req.params.userId });
  if (product) {
    res.json(product);
  } else {
    throw new NotFoundError("Product not found");
  }
});

// @desc    Update product by product id owned by userId
// @route   PATCH /api/products/ofuser/:id
// @access  Authenticated

const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product){
      res.status(404).json({ error: 'Product not found' });
      throw new NotFoundError('Product not found');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    // Handle errors appropriately
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// @desc    Delete product by product id owned by userId
// @route   DELETE /api/products/ofuser/:id
// @access  Authenticated

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    throw new NotFoundError("Product not found");
  }
});

// @desc Update comment on Product
// @route Put /api/products/:id/comment
// @access Authenticated
const createComment = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userName = req.user.name;
  const { comment } = req.body;

  if (!productId) {
    console.log("Product ID is required");
  }

  if (!userName) {
    console.log("User name is required");
  }

  if (!comment) {
    console.log("comment missing");
  }

  try {
    // console.log('test');

    const product = await Product.findById(productId);

    const newComment = {
      userName,
      comment,
    }

    if (product) {
      product.comments.push(newComment);
      await product.save();
      res.status(201).json({ message: "Comment added" });
    } else {
      console.log("Product not found");
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});

module.exports = {
  createProduct,
  createProductt,
  getAllProducts,
  getProductOwnedBySpecificUser,
  deleteProduct,
  updateProduct,
  createComment,
};
