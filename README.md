# Menu Management System - Testing Guide

> Replace object IDs with actual IDs

## Table of Contents

- [Category Testing](#category-testing)
- [Subcategory Testing](#subcategory-testing)
- [Item Testing](#item-testing)
- [Validation Testing](#validation-testing)

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

## Notes

1. Replace `:id` with actual MongoDB ObjectIds
2. Ensure MongoDB is running locally on default port
3. Server should be running on `localhost:3000`
4. All timestamps are in UTC format
5. All requests that modify data require `Content-Type: application/json` header
