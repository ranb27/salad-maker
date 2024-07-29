# salad-maker
 This is Salad Maker using next (typescript, tailwind-daisyui)
 site url: https://salad-maker-git-main-ranb27s-projects.vercel.app/

Database Provider & API: supabase (REST)
example : https://<url>.supabase.co/rest/v1/ingredients_master?apikey=<anon_key>&req_params=eq.value
** If you want to test with local after clone this project, don't forget to add .env.local contain about
"NEXT_PUBLIC_SUPABASE_URL=<supabase_url>"
"NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>"
(contact me to get key)

OR

Can use supabase and create your project salad-maker contain 2 table name "ingredients_master" (columns: ingredient_id, ingredient, category, image, calories) //need data with manual add
and table name "recipes_record" (columns: id, recipe_name, ingredient_list, created_by)

----
Require user login for auth to use feature "Create(POST), Update(PATCH) and Delete(DELETE)"
Read(GET) Show for all user and anonymous in page Recipe
Read(GET) Require auth user to display ingredients list for create recipe
----

Page - Salad Maker
GET req.query: category
POST req.body
{
    "recipe_name": "Summer Salad",
    "created_by": "Jonh",
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

Page - Recipe
GET req.query: no req (get *)
PATCH req.qeury: id, req.body
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
DELETE req.query: id
