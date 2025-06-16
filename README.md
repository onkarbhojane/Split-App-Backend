# 💸 Split App - Expense Sharing Backend

A Node.js + Express backend that allows users to split group expenses fairly and view simplified settlement summaries — inspired by apps like **Splitwise** and **Google Pay Bills Split**.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Railway / Render / Cyclic
- **API Testing**: Postman

---

## 🚀 Live Demo (Deployed API)

🔗 **Base URL**: `https://<your-deployed-url>.com/api`

---

## 📌 Features

### ✅ Core Features

1. **Expense Tracking**
   - Add new expenses with amount, description, and payer
   - View all expenses
   - Edit or delete any expense
   - No need to add people separately — derived from expenses

2. **Settlement Calculations**
   - Balance summary for each person (how much they owe/are owed)
   - Optimized settlements — minimize number of transactions
   - Clear summary of who pays whom and how much

3. **Validation & Error Handling**
   - Invalid fields (missing `paid_by`, negative `amount`, etc.)
   - Invalid IDs during update/delete
   - Proper HTTP status codes and error messages

---

## 📚 API Documentation

### 🔸 Expense Management

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/expenses`        | List all expenses              |
| POST   | `/expenses`        | Add a new expense              |
| PUT    | `/expenses/:id`    | Update an existing expense     |
| DELETE | `/expenses/:id`    | Delete an expense              |

**Example POST**: `/expenses`

```json
{
  "amount": 600,
  "description": "Dinner at restaurant",
  "paid_by": "Ramesh"
}
```

-------------------API STRUCTURE-----------------

📁 Expense Splitter APIs
  📁 Expense Management
    ✔️ Add Expense - Dinner (₹600, paid by Ramesh)
    ✔️ Add Expense - Groceries (₹450, paid by Suresh)
    ✔️ Add Expense - Petrol (₹300, paid by Onkar)
    ✔️ Update Expense - Petrol to ₹350
    ✔️ Delete Expense - Remove Pizza
  📁 Settlements & People
    ✔️ Get All People
    ✔️ Get Balances
    ✔️ Get Settlements
  📁 Edge Cases
    ✔️ Add Expense - Negative amount
    ✔️ Add Expense - Missing paid_by
    ✔️ Delete Non-existent Expense


---------------FOLDER STRUCTURE-------------------

Split-App-Backend/
├── controllers/
│   └── expenseController.js
├── models/
│   └── Expense.js
├── routes/
│   └── expenseRoutes.js
├── config/
│   └── db.js
├── .env
├── app.js
├── package.json
└── README.md


git clone https://github.com/onkarbhojane/Split-App-Backend.git
cd Split-App-Backend

npm install

MAKE SURE TO ADD .env FILE
MONGODB_URI=your-mongodb-atlas-url
PORT=5000

npm start


