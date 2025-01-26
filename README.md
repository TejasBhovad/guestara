# Menu Management System

Simple REST API for managing categories, subcategories, and items in a menu management system.

# Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Add a `.env` file with the following environment variables:

```plaintext
PORT=3000
MONGO_URI=mongodb://localhost:27017/menu (or your MongoDB connection string)
```

4. Start the server: `npm run dev`

## Table of Contents

- [Category Testing](#category-testing)
- [Subcategory Testing](#subcategory-testing)
- [Item Testing](#item-testing)
- [Validation Testing](#validation-testing)
- [Search Testing](#search-testing)

  > Replace object IDs with actual IDs

## Category Testing

### 1. Add Category (Success Case)

```bash
curl -X POST http://localhost:3000/api/categories \
-H "Content-Type: application/json" \
-d '{
  "name": "Beverages",
  "image": "https://example.com/beverages.jpg",
  "description": "All types of drinks",
  "taxApplicability": true,
  "tax": 5,
  "taxType": "PERCENTAGE"
}'
```

### 2. Get All Categories

```bash
curl http://localhost:3000/api/categories
```

### 3. Get Category By ID

```bash
curl http://localhost:3000/api/categories/679523f13d7c98f285f20ac5
```

### 4. Update Category

```bash
curl -X PUT http://localhost:3000/api/categories/679523f13d7c98f285f20ac5 \
-H "Content-Type: application/json" \
-d '{
  "name": "Hot Beverages",
  "description": "All types of hot drinks",
  "image": "https://example.com/hot-beverages.jpg"
}'
```

### 5. Delete Category

```bash
curl -X DELETE http://localhost:3000/api/categories/679523f13d7c98f285f20ac5
```

## Subcategory Testing

### 1. Add Subcategory (Success Case)

```bash
curl -X POST http://localhost:3000/api/subcategories \
-H "Content-Type: application/json" \
-d '{
  "name": "Coffee",
  "categoryId": "679523f13d7c98f285f20ac5",
  "image": "https://example.com/coffee.jpg",
  "description": "Various types of coffee drinks",
  "taxApplicability": true,
  "tax": 5
}'
```

### 2. Get All Subcategories

```bash
curl http://localhost:3000/api/subcategories
```

### 3. Get Subcategories by Category

```bash
curl http://localhost:3000/api/subcategories/category/679523f13d7c98f285f20ac5
```

### 4. Update Subcategory

```bash
curl -X PUT http://localhost:3000/api/subcategories/6795241a3d7c98f285f20ac8 \
-H "Content-Type: application/json" \
-d '{
  "name": "Hot Coffee",
  "description": "Various types of hot coffee drinks",
  "image": "https://example.com/hot-coffee.jpg"
}'
```

## Item Testing

### 1. Add Item (Success Case)

```bash
curl -X POST http://localhost:3000/api/items \
-H "Content-Type: application/json" \
-d '{
  "name": "Cappuccino",
  "categoryId": "679523f13d7c98f285f20ac5",
  "subcategoryId": "6795241a3d7c98f285f20ac8",
  "image": "https://example.com/cappuccino.jpg",
  "description": "Italian coffee drink with steamed milk foam",
  "taxApplicability": true,
  "tax": 5,
  "baseAmount": 150,
  "discount": 0
}'
```

### 2. Get All Items

```bash
curl http://localhost:3000/api/items
```

### 3. Get Items by Category

```bash
curl http://localhost:3000/api/items/category/679523f13d7c98f285f20ac5
```

### 4. Get Items by Subcategory

```bash
curl http://localhost:3000/api/items/subcategory/6795241a3d7c98f285f20ac8
```

### 5. Update Item

```bash
curl -X PUT http://localhost:3000/api/items/679525003d7c98f285f20acb \
-H "Content-Type: application/json" \
-d '{
  "name": "Large Cappuccino",
  "description": "Large Italian coffee drink with extra foam",
  "baseAmount": 180
}'
```

## Validation Testing

### 1. Category Validation (Fail Case)

```bash
curl -X POST http://localhost:3000/api/categories \
-H "Content-Type: application/json" \
-d '{
  "name": "M",
  "image": "not-a-url",
  "description": "",
  "taxApplicability": true,
  "tax": 150,
  "taxType": "INVALID"
}'
```

### 2. Subcategory Validation (Fail Case)

```bash
curl -X POST http://localhost:3000/api/subcategories \
-H "Content-Type: application/json" \
-d '{
  "name": "V",
  "categoryId": "invalid-id",
  "image": "not-a-url",
  "description": "",
  "taxApplicability": "invalid-boolean"
}'
```

### 3. Item Validation (Fail Case)

```bash
curl -X POST http://localhost:3000/api/items \
-H "Content-Type: application/json" \
-d '{
  "name": "P",
  "categoryId": "invalid-id",
  "subcategoryId": "invalid-id",
  "image": "not-a-url",
  "description": "",
  "taxApplicability": true,
  "tax": 150,
  "baseAmount": -100,
  "discount": 1000
}'
```

## Search Testing

Here are the cURL commands for testing the search endpoints:

# Search API Testing Commands

Current Date and Time (UTC): 2025-01-25 18:29:59
Current User: TejasBhovad

## 1. Search All (searches across categories, subcategories, and items)

```bash
# Basic search
curl "http://localhost:3000/api/items/search/all?query=coffee"

# With filters
curl "http://localhost:3000/api/items/search/all?query=coffee&limit=10&page=1"
```

## 2. Search Items Only

```bash
# Basic item search
curl "http://localhost:3000/api/items/search/items?query=cappuccino"

# Search with price range
curl "http://localhost:3000/api/items/search/items?query=coffee&minPrice=100&maxPrice=500"

# Search with multiple filters
curl "http://localhost:3000/api/items/search/items?query=coffee&minPrice=100&maxPrice=500&taxApplicability=true"

# Search with sorting
curl "http://localhost:3000/api/items/search/items?query=coffee&sortBy=price&sortOrder=desc"

# Search with pagination
curl "http://localhost:3000/api/items/search/items?query=coffee&page=1&limit=10"
```

## 3. Search by Category

```bash
# Search items in a specific category
curl "http://localhost:3000/api/items/search/category?categoryId=679523f13d7c98f285f20ac5&query=hot"

# With additional filters
curl "http://localhost:3000/api/items/search/category?categoryId=679523f13d7c98f285f20ac5&query=hot&minPrice=100&maxPrice=300"

# With sorting and pagination
curl "http://localhost:3000/api/items/search/category?categoryId=679523f13d7c98f285f20ac5&query=hot&sortBy=name&sortOrder=asc&page=1&limit=10"
```

## 4. Search by Subcategory

```bash
# Search items in a specific subcategory
curl "http://localhost:3000/api/items/search/subcategory?subcategoryId=6795241a3d7c98f285f20ac8&query=espresso"

# With additional filters
curl "http://localhost:3000/api/items/search/subcategory?subcategoryId=6795241a3d7c98f285f20ac8&query=espresso&minPrice=150&maxPrice=400"

# With sorting and pagination
curl "http://localhost:3000/api/items/search/subcategory?subcategoryId=6795241a3d7c98f285f20ac8&query=espresso&sortBy=price&sortOrder=desc&page=1&limit=5"
```

## Expected Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 48,
      "itemsPerPage": 10
    }
  },
  "message": "Search completed successfully",
  "timestamp": "2025-01-25 18:29:59",
  "user": "TejasBhovad"
}
```

### Error Response

```json
{
  "success": false,
  "errors": ["Invalid search parameters"],
  "timestamp": "2025-01-25 18:29:59",
  "user": "TejasBhovad"
}
```

## Available Query Parameters

1. **Common Parameters**

   - `query`: Search term (string)
   - `page`: Page number (number, default: 1)
   - `limit`: Items per page (number, default: 10)
   - `sortBy`: Field to sort by (name, price, createdAt)
   - `sortOrder`: Sort direction (asc, desc)

2. **Item Search Specific Parameters**

   - `minPrice`: Minimum price (number)
   - `maxPrice`: Maximum price (number)
   - `taxApplicability`: Tax applicability filter (boolean)

3. **Category/Subcategory Search Parameters**
   - `categoryId`: Category ID for category search
   - `subcategoryId`: Subcategory ID for subcategory search

## Expected Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2025-01-25 18:23:22",
  "user": "TejasBhovad"
}
```

### Error Response

```json
{
  "success": false,
  "errors": ["Error details"],
  "timestamp": "2025-01-25 18:23:22",
  "user": "TejasBhovad"
}
```
