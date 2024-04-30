const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const crypto=require("crypto");
const nodemailer= require("nodemailer");

const app=express();
const port=8000;
const cors=require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
}));


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const jwt=require("jsonwebtoken");

mongoose.connect("mongodb+srv://sanarvibra:sanarvibra@cluster0.vfqw1l5.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to Mongodb")
}).catch((err) => {
    console.log("error connection",err)
})

app.listen(port,"0.0.0.0",() => {
    console.log("server is running")
})


// app.get("/",(req,res)=> {
//     res.send("Express is running")
// })

const User = require("./models/user");
const Product = require("./models/Product");
const Review = require("./models/Review");
const Order = require("./models/order");
const AddProd = require("./models/AddProd");

// const sendVerificationEmail = async (email, verificationToken) => {
//     // Create a Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       // Configure the email service or SMTP details here
//       service: "gmail",
//       auth: {
//         user: "sanarvibra@gmail.com",
//         pass: "uydo lmuq etgv jnge",
//       },
//     });
//     console.log("check here")
//     // Compose the email message
//     const mailOptions = {
//       from: "E-commerceApp.com",
//       to: email,
//       subject: "Email Verification",
//       text: `Please click the following link to verify your email: http://192.168.170.104:8000/verify/${verificationToken}`,
//     };
  
//     // Send the email
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log("Verification email sent successfully");
//     } catch (error) {
//       console.error("Error sending verification email:", error);
//     }
//   };

app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log("Executed")
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered:", email); // Debugging statement
        return res.status(400).json({ message: "Email already registered" });
      }
  
  
      // Create a new user
      const newUser = new User({ name, email, password });
      console.log(newUser)
  
      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
  
      // Save the user to the database
      await newUser.save();
  
      // Debugging statement to verify data
      console.log("New User Registered:", newUser);
  
      // Send verification email to the user
      // Use your preferred email service or library to send the email
      //sendVerificationEmail(newUser.email, newUser.verificationToken);
  
      res.status(201).json({
        message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

// //endpoint to verify the email
// app.get("/verify/:token", async (req, res) => {
//     try {
//       const token = req.params.token;
//       console.log("check--",token);
  
//       //Find the user witht the given verification token
//       const user = await User.findOne({ verificationToken: token });
//       if (!user) {
//         return res.status(404).json({ message: "Invalid verification token" });
//       }
  
//       //Mark the user as verified
//       user.verified = true;
//       user.verificationToken = undefined;
  
//       await user.save();
  
//       res.status(200).json({ message: "Email verified successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Email Verificatioion Failed" });
//     }
//   });

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
  const secretKey = generateSecretKey();
  
  //endpoint to login the user!
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email == "Admin" && password == "Admin") {
        return res.status(201).json({ message: "Admin login", isAdmin: true });
      }  
  
      //check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      //check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      console.log("heyyy--->", user._id);
      //generate a token
      const token = jwt.sign({ userId: user._id }, secretKey);
      let isAdmin=false;
  
      res.status(200).json({ token,isAdmin });
    } catch (error) {
      res.status(500).json({ message: "Login Failed" });
    }
  });

  app.post('/product/:id/addreview', async (req, res) => {
    try {
      //console.log("fhfh",req);
      const productId = req.params.id;
      const { author, comment, rating } = req.body;
  
      //Find a product by its 'id' field
      let product = await Product.findOne({ id: productId });
      console.log("fhfh1",product);
      const newReview = new Review({ author, comment, rating });
      const savedReview = await newReview.save();
      console.log("ffg--", savedReview)
  
      if (!product) {
        try {
          const newProduct = new Product({ id: productId, reviews: [savedReview] });
          product = await newProduct.save();
          console.log("New product created:", product);
        } catch (error) {
          console.log("error-->>", error)
        }
      } else {
        product.reviews.push(savedReview);
        await product.save();
        console.log("Review added to existing product:", product);
      }
  
      res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to add review' });
    }
  });

  app.get('/product/:id/reviews', async (req, res) => {
    try {
      const productId = req.params.id;
      console.log("gff->", productId)
  
      // Find the product by its ID and populate the 'reviews' field
      const product = await Product.findOne({ id: productId }).populate('reviews');
      
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // // Extract reviews from the product and return them
      const reviews = product.reviews;
      //console.log("gff111->", reviews)
      res.status(200).json({ reviews });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/wishlist', async (req, res) => {
    const { userId, itemId, title, price,quantity} = req.body;
  
    try {
      console.log(userId, itemId, "here it is");
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      console.log("exist1",user)
      const existingItem = user.wishlist.find(item => item.itemId == itemId);
      console.log("exist",existingItem)
      if (existingItem) {
        // If the item already exists, increment its quantity
        existingItem.quantity += quantity;
      } else {
        // If the item doesn't exist, add it to the wishlist
        user.wishlist.push({
          itemId,
          title,
          price,
          quantity,
        });
      }
      await user.save();
  
      // Return success response
      res.status(200).json({ message: "Item added to wishlist successfully" });
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/users/:userId/wishlist", async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId).populate("wishlist"); // Assuming wishlist is a field in the User model referencing the wishlist items
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Return the wishlist of the user
      res.status(200).json(user.wishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/wishlist/delete", async (req, res) => {
    const { userId, itemId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.wishlist = user.wishlist.filter(item => item.itemId !== itemId);
      await user.save();
  
      res.status(200).json({ message: "Item deleted from wishlist successfully" });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Endpoint for incrementing the quantity of an item in the wishlist
app.post("/wishlist/increment", async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.wishlist.find(item => item.itemId === itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in wishlist" });
    }

    item.quantity++;
    await user.save();

    res.status(200).json(item);
  } catch (error) {
    console.error("Error incrementing quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for decrementing the quantity of an item in the wishlist
app.post("/wishlist/decrement", async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.wishlist.find(item => item.itemId === itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in wishlist" });
    }

    if (item.quantity > 1) {
      item.quantity--;
      await user.save();
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error decrementing quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    //const { userId, address } = req.body;
    const { userId, address } = req.body;

    //console.log("userid->", req)

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    //console.log(error);

    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

app.get("/users/:userId/wishlist", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for clearing the user's wishlist
app.delete("/wishlist/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.wishlist = [];
    await user.save();
    res.status(200).json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      itemId: item?.itemId,
    }));
    //console.log("pro",products);

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, color, size, userId } = req.body;
    console.log("req", req.body)

    // Retrieve the user's information from the database using the userId stored in req
    const user = await User.findById(userId);

    // Create a new product with the user's name and email
    const product = new AddProd({
      name,
      price,
      color,
      size,
      status: "requested",
      //image: { data: req.file.buffer, contentType: req.file.mimetype }, // Store image data
      RequestedBy: {
        name: user.name,
        email: user.email
      }
    });
    console.log("pro",product)

    const savedProduct = await product.save(); // Save the product and capture the result
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to retrieve all products
app.get('/products', async (req, res) => {
  try {
    // Fetch all products from MongoDB
    const products = await AddProd.find();

    // Convert image data to base64 string
    const productsWithBase64Images = products.map(product => {
      // Check if the image data is already a Buffer
      //const imageData = Buffer.isBuffer(product.image.data) ? product.image.data.toString('base64') : product.image.data;
      return {
        ...product._doc,
        // image: {
        //   data: imageData,
        //   contentType: product.image.contentType
        // }
      };
    });

    res.status(200).json(productsWithBase64Images);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/products/:productId/accept', async (req, res) => {
  try {
    const productId = req.params.productId;
    //console.log("itemid", productId)
    // Update the product status to 'accepted' in the database
    await AddProd.findByIdAndUpdate(productId, { status: 'accepted' });
    res.status(200).send("Product request accepted successfully.");
  } catch (error) {
    console.error('Error accepting product request:', error);
    res.status(500).send("Internal Server Error");
  }
});

// POST endpoint to reject a product request by ID
app.post('/products/:productId/reject', async (req, res) => {
  try {
    const productId = req.params.productId;
    // Update the product status to 'rejected' in the database
    await AddProd.findByIdAndUpdate(productId, { status: 'rejected' });
    res.status(200).send("Product request rejected successfully.");
  } catch (error) {
    console.error('Error rejecting product request:', error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to send emails
app.post('/send-email', async (req, res) => {
  const { toEmail, subject, text } = req.body;
  console.log("huiii",req.body)

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure the email service or SMTP details here
      service: "gmail",
      auth: {
        user: "sanarvibra@gmail.com",
        pass: "uydo lmuq etgv jnge",
      },
    });

    // Compose the email message
    const mailOptions = {
      from: "E-commerceApp.com",
      to: toEmail,
      subject: subject,
      text: text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Respond with success message
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

