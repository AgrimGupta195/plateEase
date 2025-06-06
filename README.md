# PlatEase API

This is the backend for the PlatEase mobile application.  
It provides authentication, product management, cart, and review features.

---

## Base URL

```
https://plateease.onrender.com/api/
```

---

## Authentication Routes

| Method | Endpoint           | Body (JSON)                                  | Description                |
|--------|--------------------|----------------------------------------------|----------------------------|
| POST   | `/userAuth/signup` | `{ name, username, email, password }`        | Register a new user        |
| POST   | `/userAuth/login`  | `{ username, password }`                     | Login, returns JWT token   |

---

## Product (Item) Routes

| Method | Endpoint                        | Auth Required | Body / Params                                  | Description                        |
|--------|---------------------------------|--------------|------------------------------------------------|------------------------------------|
| POST   | `/items/addItems`               | Admin        | `{ name, price, description, images, category }`<br>**images:** array of image URLs (string[]) | Add a new product                  |
| GET    | `/items/getItems`               | No           |                                                | Get all products                   |
| DELETE | `/items/deleteItems/:id`        | Admin        |                                                | Delete a product by ID             |
| GET    | `/items/getItemsByCategory/:category` | No     |                                                | Get products by category           |
| PATCH  | `/items/toggleStock/:id`        | Admin        |                                                | Toggle product stock (in/out)      |

---


## Cart Routes

| Method | Endpoint                | Auth Required | Body / Params                  | Description                        |
|--------|-------------------------|--------------|--------------------------------|------------------------------------|
| GET    | `/cart/`                | Yes          |                                | Get all products in user's cart    |
| POST   | `/cart/add/:productId`  | Yes          |                                | Add a product to cart              |
| DELETE | `/cart/remove/:productId?` | Yes       |                                | Remove a product or all from cart  |
| PUT    | `/cart/update/:productId` | Yes        | `{ quantity }`                 | Update quantity of a product in cart|

---

## Review Routes

| Method | Endpoint            | Auth Required | Body (JSON)           | Description                        |
|--------|---------------------|--------------|-----------------------|------------------------------------|
| POST   | `/reviews/:itemId`  | Yes          | `{ rating, comment }` | Add a review to a product          |
| PUT    | `/reviews/:itemId`  | Yes          | `{ rating, comment }` | Edit your review for a product     |
| DELETE | `/reviews/:itemId`  | Yes          |                       | Delete your review for a product   |

---

## Authentication

- After login/signup, you will receive a JWT token.
- For protected routes, send this header:
  ```
  Authorization: Bearer <your_token>
  ```

---

## Example Product Object

```json
{
  "_id": "productId",
  "name": "Pizza",
  "description": "Delicious cheese pizza",
  "price": 299,
  "category": "Italian",
  "images": [
    "https://cloudinary.com/image1.jpg",
    "https://cloudinary.com/image2.jpg"
  ],
  "stock": true,
  "rating": 4.5,
  "reviews": [
    {
      "user": {
        "_id": "userId",
        "username": "john_doe",
        "name": "John Doe"
      },
      "rating": 5,
      "comment": "Amazing!"
    }
  ],
  "tags": ["cheese", "pizza", "italian"]
}
```

---

## Notes

- All responses are in JSON.
- For image uploads, send an **array of image URLs** (already uploaded to Cloudinary).
- Only admins can add, delete, or toggle stock for products.
- The `images` field must be sent as an array of strings (e.g. `["url1", "url2"]`).

---

## Environment Variables

See `.env` for required variables (MongoDB URI, JWT secret, email, Cloudinary, etc).
