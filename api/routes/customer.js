var express = require("express");
var router = express.Router();
var Customer = require("../models/Customer.model").Customer;

router.get("/", async (req, res, next) => {
  res.send(await Customer.findAll());
});

router.get("/:orderId", async (req, res) => {
  res.send(
    await Customer.findOne({
      where: {
        order_number: req.params.orderId,
      },
    })
  );
});

router.post("/save", async (req, res) => {
  let ans = await Customer.create(req.body);
  res.send(ans);
});

router.put("/update", async (req, res) => {
  let id = req.body.order_number;
  let body = req.body;

  let ans = await Customer.update({ 
  order_due_date :body.order_due_date,
  customer_address: body.customer_address
},
  {where:{order_number:id}});
  res.send(ans);
});

router.delete("/delete/:orderNumber", async (req, res) => {
    await Customer.destroy({
      where: {
        order_number: req.params.orderNumber,
      },
    }).then(()=>{
      res.send("Deleted");
    })
});

module.exports = router;
