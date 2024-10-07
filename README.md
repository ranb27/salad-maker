# salad-maker
 This is Salad Maker using next (typescript, tailwind-daisyui)
 <h1>site url: https://salad-maker-ranb.vercel.app</h1>
 <h2>**for test account, Email: test@ranb.com, Password: test</h2>

Database Provider & API: supabase (REST)
example : https://<url>.supabase.co/rest/v1/ingredients_master?apikey=<anon_key>&req_params=eq.value <br/>
** If you want to test with local after clone this project, don't forget to add .env.local contain about <br/>
"NEXT_PUBLIC_SUPABASE_URL=<supabase_url>" <br/>
"NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>" <br/>
(contact me to get key) <br/>
OR <br/>
Can use supabase and create your project salad-maker contain 2 table name "ingredients_master" (columns: ingredient_id, ingredient, category, image, calories) //need data with manual add
and table name "recipes_record" (columns: id, recipe_name, ingredient_list, created_by) <br/>

Require user login for auth to use feature "Create(POST), Update(PATCH) and Delete(DELETE)" <br/>
Read(GET) Show for all user and anonymous in page Recipe <br/>
Read(GET) Require auth user to display ingredients list for create recipe

Page - Salad Maker <br/>
GET req.query: category <br/>
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
} <br/>

Page - Recipe <br/>
GET req.query: no req (get *) <br/>
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
} <br/>
DELETE req.query: id
