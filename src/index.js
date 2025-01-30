const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const app = express();

const receiptData = new Map();

app.get("/", (req, res) => {
  console.log("hell owlrd!");
  res.send({ message: "hello wrold" });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//helper to determine if char is a letter
function isCharacterALetter(char) {
  return /[a-zA-Z]/.test(char);
}
const calculatePoints = receiptData => {
  const { retailer, purchaseDate, purchaseTime, items, total } = receiptData;

  let pointTotal = 0;
  //parse the retialer name convert to lowercase i'm assuming uppercase and lowercase are the same so i lowercase the retailers name
  const lowerCaseRetailer = retailer.toLowerCase();
  let letterCount = 0;
  for (let letter of lowerCaseRetailer) {
    if (isCharacterALetter(letter)) {
      letterCount++;
    }
  }
  pointTotal += letterCount;

  //calculate if the subtotal was a round number split on the decimal take the second portion and check if its 00
  const totalSplit = total.split(".");
  if (totalSplit[1] === "00") {
    pointTotal += 50;
  }

  //calculate if the subtotal is a multipe of .25
  //i multiply the total by 100 and divide by 25 so i don't have to deal with decimals
  const totalMultiplied = Number(total) * 100;
  if (totalMultiplied % 25 === 0) {
    pointTotal += 25;
  }

  //calcuate hwo many items are in the receipt, divide by 2 the length and round down multipe by 5
  const itemTotal = Math.floor(items.length / 2) * 5;

  pointTotal += itemTotal;

  //iterate through the items trim the the description
  //check if the length is divisible by 3 if so multiply the price by .25 and round up and add to the total
  for (let item of items) {
    console.log(item);
    const trimDescription = item.shortDescription.trim();
    const length = trimDescription.length;

    if (length % 3 === 0) {
      const itemPrice = Math.round(Number(item.price) * 0.25);
      pointTotal += itemPrice;
    }
  }

  //confused on the llm point total

  //calculate if the day is odd, get the date and check the day if divisible by 2
  const [year, month, day] = purchaseDate.split("-");

  if (Math.floor(day / 2) === 0) {
    pointTotal += 6;
  }

  //check if the time is between 2pm -4pm inclusive
  //create start time and end time date objects.
  //split the purchase time and create date object
  const startTime = new Date(1970, 0, 1, 14, 0, 0);
  const endTime = new Date(1970, 0, 1, 16, 0, 0);
  const [hours, seconds] = purchaseTime.split(":");
  const currentTime = new Date(1970, 0, 1, hours, seconds);

  if (currentTime >= startTime && currentTime <= endTime) {
    pointTotal += 10;
  }

  return pointTotal;
};

app.post("/receipts/process", (req, res) => {
  const body = req.body;
  try {
    const pointTotal = calculatePoints(body);

    const id = uuidv4();

    receiptData.set(id, pointTotal);

    console.log("point total!", pointTotal);
    res.send({ id: id });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// look into getting method when sending an id
app.get(`/receipts/:id/points`, (req, res) => {
  try {
    const { id } = req.params;

    if (receiptData.has(id)) {
      const points = receiptData.get(id);
      res.status(200).send({ points: points });
    } else {
      res.status(400).send({ message: "no points found with that id!" });
    }
  } catch (err) {
    res.status(404).send({ message: "error occured fetching!" });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port UPDATE THE PORT! http://localhost:${port}`);
});
