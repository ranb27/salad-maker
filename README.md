# 🥗 Salad Maker

A Next.js application for creating and managing salad recipes, built with TypeScript and Tailwind CSS + DaisyUI.

## 🔗 Live Demo

Visit the live site: [https://salad-maker-ranb.vercel.app](https://salad-maker-ranb.vercel.app)

### Test Account

- **Email:** test@ranb.com
- **Password:** test

## 🛠️ Tech Stack

- **Frontend:** Next.js with TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Database & API:** Supabase (REST)

## 📝 API Examples

```
GET https://<url>.supabase.co/rest/v1/ingredients_master?apikey=<anon_key>&req_params=eq.value
```

## 🚀 Local Development Setup

1. Clone the repository
2. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
   ```
   Contact the maintainer for API keys or set up your own Supabase project.

### Setting up your own Supabase project

If you prefer to use your own Supabase instance, create a project with the following tables:

1. **ingredients_master**

   - Columns:
     - ingredient_id
     - ingredient
     - category
     - image
     - calories
   - Note: Data needs to be added manually

2. **recipes_record**
   - Columns:
     - id
     - recipe_name
     - ingredient_list
     - created_by

## 🔒 Authentication

- User login required for Create (POST), Update (PATCH), and Delete (DELETE) operations
- Read (GET) operations are available to all users (including anonymous) on the Recipe page
- Reading ingredients list for creating recipes requires authentication

## 📋 API Endpoints

### Salad Maker Page

#### GET

- Query parameter: `category`

#### POST

Request body:

```json
{
  "recipe_name": "Summer Salad",
  "created_by": "John",
  "ingredient_list": [
    {
      "ingredient": "green leaf lettuce",
      "image": "path/to/image.jpg",
      "calories": 8,
      "amount": 2,
      "category": "vegetable"
    }
  ]
}
```

### Recipe Page

#### GET

- No query parameters (retrieves all recipes)

#### PATCH

- Query parameter: `id`
- Request body:

```json
{
  "ingredient_list": [
    {
      "ingredient": "green leaf lettuce",
      "image": "path/to/image.jpg",
      "calories": 8,
      "amount": 2,
      "category": "vegetable"
    }
  ]
}
```

#### DELETE

- Query parameter: `id`
