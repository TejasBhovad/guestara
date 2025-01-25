# Menu management System

## Testing

1. Add Category

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

2. Get All Categories

```bash
curl http://localhost:3000/api/categories
```

3. Get Category By Id

```bash
curl http://localhost:3000/api/categories/:id
```

4. Update Category

```bash
curl -X PUT http://localhost:3000/api/categories/:id \
-H "Content-Type: application/json" \
-d '{
  "name": "Hot Beverages",
  "description": "All types of hot drinks"
}'
```
