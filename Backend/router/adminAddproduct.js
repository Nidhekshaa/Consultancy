const Product = require("../model/Product"); // import model

router.post("/add-product", upload.single("image"), async (req, res) => {
  const { name, price, category } = req.body;
  const imagePath = req.file?.filename;

  if (!name || !price || !imagePath || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = new Product({
      name,
      price,
      category,
      image: imagePath,
    });

    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
