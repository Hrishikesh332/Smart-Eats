<br />
<div align="center">
  <a href="https://github.com/rock12231/SmartEats">
    <img src="https://github.com/rock12231/SmartEats/blob/master/Frontend/src/assets/images/logo.jpeg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">SmartEats</h3>
  <p align="center">
    Personalized Meal Planning and Tracking
    <br />
    <a href="https://github.com/rock12231/SmartEats"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rock12231/SmartEats">View Demo</a>
    ·
    <a href="https://github.com/rock12231/SmartEats/issues">Report Bug</a>
    ·
    <a href="https://github.com/rock12231/SmartEats/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#About">About</a></li>
    <li><a href="#Features">Features</a></li>
    <li><a href="#Tech-Stack">Tech Stack</a></li>
    <li><a href="#Instructions-on-running-project-locally">Instructions on running project locally</a></li>
    <li><a href="#Usecases">Usecases</a></li>
    <li><a href="#Feedback">Feedback</a></li>
  </ol>
</details>

------

## About

SmartEats is an AI-powered application that revolutionizes meal planning and tracking through personalized meal plans and automated food verification. Using large language models, SmartEats generates tailored meal plans based on user data points and preferences to enhance personalization. Multimodal model is used to verify that the food image matches its description, creating a seamless experience for users.

SmartEats encourages users to stay motivated by tracking meals, generating recipe suggestions, and offering rewards based on meal adherence. Whether you're looking to eat healthier or achieve specific fitness goals, SmartEats is designed to support your journey.

## Features

🍽️ **Personalized Meal Plans**- Generate custom meal plans based on user data, preferences, and goals using **Gemini**.

📱 **Food Verification** - Automatically verify if the food matches its description and image using a multimodal model.

🎯 **Progress Tracking** - Keep track of meals, progress, and daily caloric intake to stay on top of health goals.

🍲 **Recipe Suggestions** - Receive personalized recipe suggestions based on user preferences and available ingredients.

🏅 **Rewards & Gamification** - Gain points and rewards for staying consistent with your meal plan, keeping you motivated.

## Tech Stack

**Frontend** - Angular, JavaScript, HTML, CSS

**Backend** - Flask, Gemini, Gemini-1.5-flash, Firebase Auth, Firebase Real Time Database

**AI Technologies** - Large multimodal models for image verification, Gemini LLM for meal generation and for the Recipe Generation.

**Deployment** - Firebase, Render


## Workflow

![workflow-smarteats](https://github.com/rock12231/SmartEats/blob/master/Frontend/src/assets/images/workflow-smarteats.png)

## Instructions on running project locally:

Clone the project

```bash
  git clone https://github.com/rock12231/SmartEats.git
```

### For Backend

```bash
  cd Backend
```

Installing all the dependencies
```bash
  pip install -r requirements.txt
```

Run the server
```bash
  python main.py
```

### For Frotend

```bash
  cd Frontend
```

Dependencies
```bash
  npm i
```

Run the Server
```bash
  npm start
```

### Firebase Realtime Database

  One User DB Example

```bash
  {
  "users": {
    "1xFUPmeka1fftYDS4KVHbrJshTy2": {
      "challenges": {
        "-O7tCFUO4lIBYiiwE5dl": {
          "createdAt": "2024-09-28 15:16:37",
          "day": "2",
          "deleted": false,
          "displayName": "Avinash Kumar",
          "isActive": true,
          "meals": {
            "Day1": {
              "breakfast": {
                "calories": "450-500",
                "details": "Oats Porridge with Fruits and Nuts - 1 cup cooked oats, ½ cup mixed berries, ¼ cup almonds & walnuts, 1 tsp chia seeds, 1 glass milk",
                "img": "https://firebasestorage.googleapis.com/v0/b/smarteats-e3e08.appspot.com/o/Challenge%2F1xFUPmeka1fftYDS4KVHbrJshTy2%2F-O7tCFUO4lIBYiiwE5dl%2FOats%20Porridge%20with%20Fruits%20and%20Nuts?alt=media&token=b75c6b30-2ac9-402d-89da-235a5d61723f",
                "name": "Oats Porridge with Fruits and Nuts",
                "nutrients": {
                  "calories": 550,
                  "carbohydrates": "75 g",
                  "fats_saturated": "5 g",
                  "fats_trans": "0 g",
                  "fats_unsaturated": "18 g",
                  "meal_name": "Oats Porridge with Fruits and Nuts",
                  "protein": "22 g",
                  "serving_size": "1 cup cooked oats, 1/2 cup mixed berries, 1/4 cup almonds & walnuts, 1 tsp chia seeds, 1 glass (8 fl oz) milk"
                },
                "score": 7,
                "status": "Done"
              },
              "dinner": {
                "calories": "550-600",
                "details": "Paneer Bhurji with Roti - 1.5 cups paneer bhurji made with vegetables, 2 rotis, 1 cup salad",
                "img": "https://firebasestorage.googleapis.com/v0/b/smarteats-e3e08.appspot.com/o/Challenge%2F1xFUPmeka1fftYDS4KVHbrJshTy2%2F-O7tCFUO4lIBYiiwE5dl%2FPaneer%20Bhurji%20with%20Roti%20and%20Salad?alt=media&token=d505060c-174a-4276-877e-6f4e942a56ad",
                "name": "Paneer Bhurji with Roti and Salad",
                "nutrients": {
                  "calories": 650,
                  "carbohydrates": "80 g",
                  "fats_saturated": "10 g",
                  "fats_trans": "0.5 g",
                  "fats_unsaturated": "15 g",
                  "meal_name": "Paneer Bhurji with Roti and Salad",
                  "protein": "35 g",
                  "serving_size": "1.5 cups Paneer Bhurji, 2 Rotis, 1 cup Salad"
                },
                "score": 8,
                "status": "Done"
              },
              "lunch": {
                "calories": "600-650",
                "details": "Rajma Chawal - 1 cup cooked rajma, 1.5 cups brown rice, 1 side salad of cucumber and onion, 1 glass buttermilk",
                "img": "https://firebasestorage.googleapis.com/v0/b/smarteats-e3e08.appspot.com/o/Challenge%2F1xFUPmeka1fftYDS4KVHbrJshTy2%2F-O7tCFUO4lIBYiiwE5dl%2FRajma%20Chawal%20with%20Buttermilk?alt=media&token=bd3f1584-7d5b-4d9c-850c-a54f143e62f1",
                "name": "Rajma Chawal with Buttermilk",
                "nutrients": {
                  "calories": 620,
                  "carbohydrates": "105 g",
                  "cholesterol": "5 mg",
                  "fats_saturated": "3 g",
                  "fats_trans": "0 g",
                  "fats_unsaturated": "5 g",
                  "fiber": "20 g",
                  "key_nutrients": {
                    "Folate": "30% RDI",
                    "Iron": "20% RDI",
                    "Magnesium": "25% RDI",
                    "Potassium": "15% RDI",
                    "Vitamin B12": "15% RDI"
                  },
                  "meal_name": "Rajma Chawal",
                  "protein": "28 g",
                  "serving_size": "1 cup rajma, 1.5 cups brown rice, 1 side salad, 1 glass buttermilk",
                  "sodium": "400 mg",
                  "sugar": "5 g"
                },
                "score": 9,
                "status": "Done"
              }
            },
            "Day2": {
              "breakfast": {
                "calories": "400-450",
                "details": "Besan Chilla with Mint Chutney - 2 besan chilla made with vegetables, ½ cup mint chutney, 1 glass milk",
                "img": "",
                "name": "Besan Chilla with Mint Chutney and Milk",
                "status": "pending"
              },
              "dinner": {
                "calories": "500-550",
                "details": "Dal Makhani with Roti - 1 cup dal makhani, 2 rotis, 1 cup salad",
                "img": "https://firebasestorage.googleapis.com/v0/b/smarteats-e3e08.appspot.com/o/Challenge%2F1xFUPmeka1fftYDS4KVHbrJshTy2%2F-O7tCFUO4lIBYiiwE5dl%2FDal%20Makhani%20with%20Roti%20and%20Salad?alt=media&token=70f839db-d9e7-46b9-bdec-4a60bc3bb64d",
                "name": "Dal Makhani with Roti and Salad",
                "score": 9,
                "status": "Done"
              },
              "lunch": {
                "calories": "550-600",
                "details": "Vegetable Pulao with Raita - 1.5 cups vegetable pulao, ½ cup raita, 1 cup salad",
                "img": "",
                "name": "Vegetable Pulao with Raita and Salad",
                "status": "pending"
              }
            },
            "Day3": {
              "breakfast": {
                "calories": "450-500",
                "details": "Sprouts Salad with Fruits - 1 cup mixed sprouts salad with chopped fruits like apple, banana, pomegranate, ½ cup curd",
                "img": "",
                "name": "Sprouts Salad with Fruits and Curd",
                "status": "pending"
              },
              "dinner": {
                "calories": "550-600",
                "details": " Tofu Curry with Rice - 1 cup tofu curry made with vegetables, 1 cup brown rice, 1 cup salad",
                "img": "",
                "name": "Tofu Curry with Rice and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "600-650",
                "details": "Chole Bhature (limit to 1 bhatura) - 1 bhatura, 1 cup chole, 1 cup onion salad, 1 glass buttermilk",
                "img": "",
                "name": "Chole Bhature with Buttermilk",
                "status": "pending"
              }
            },
            "Day4": {
              "breakfast": {
                "calories": "400-450",
                "details": "Peanut Butter Toast with Banana - 2 slices whole wheat toast, 2 tbsp peanut butter, 1 banana sliced, 1 glass milk",
                "img": "",
                "name": "Peanut Butter Toast with Banana and Milk",
                "status": "pending"
              },
              "dinner": {
                "calories": "500-550",
                "details": "Moong Dal Cheela with Chutney - 2 moong dal cheela made with vegetables, ½ cup mint chutney, 1 cup salad",
                "img": "",
                "name": "Moong Dal Cheela with Chutney and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "550-600",
                "details": "Aloo Paratha with Curd - 2 Aloo Paratha, 1 cup curd, 1 cup salad, 1 glass buttermilk",
                "img": "",
                "name": "Aloo Paratha with Curd and Buttermilk",
                "status": "pending"
              }
            },
            "Day5": {
              "breakfast": {
                "calories": "450-500",
                "details": "Vegetable Poha - 1.5 cups vegetable poha, ½ cup peanuts, 1 glass milk",
                "img": "",
                "name": "Vegetable Poha with Peanuts and Milk",
                "status": "pending"
              },
              "dinner": {
                "calories": "550-600",
                "details": "Palak Paneer with Roti - 1 cup palak paneer, 2 rotis, 1 cup salad",
                "img": "",
                "name": "Palak Paneer with Roti and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "600-650",
                "details": "Kadhi Chawal - 1.5 cups kadhi pakoda, 1 cup brown rice, 1 cup salad",
                "img": "",
                "name": "Kadhi Chawal with Salad",
                "status": "pending"
              }
            },
            "Day6": {
              "breakfast": {
                "calories": "400-450",
                "details": "Scrambled Tofu with Toast - 1 cup scrambled tofu with vegetables, 2 slices whole wheat toast, 1 glass milk",
                "img": "",
                "name": "Scrambled Tofu with Toast and Milk",
                "status": "pending"
              },
              "dinner": {
                "calories": "500-550",
                "details": "Vegetable Biryani with Raita - 1 cup vegetable biryani, ½ cup raita, 1 cup salad",
                "img": "",
                "name": "Vegetable Biryani with Raita and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "550-600",
                "details": "Masala Oats - 1.5 cups masala oats prepared with vegetables, 1 cup curd, 1 cup salad",
                "img": "",
                "name": "Masala Oats with Curd and Salad",
                "status": "pending"
              }
            },
            "Day7": {
              "breakfast": {
                "calories": "450-500",
                "details": "Fruit and Yogurt Parfait - Layers of ½ cup Greek yogurt, 1 cup mixed fruits (banana, berries, apple), ¼ cup granola, 1 tsp chia seeds",
                "img": "",
                "name": "Fruit and Yogurt Parfait",
                "status": "pending"
              },
              "dinner": {
                "calories": "550-600",
                "details": "Paneer Tikka Masala with Roti - 1 cup paneer tikka masala, 2 rotis, 1 cup salad",
                "img": "",
                "name": "Paneer Tikka Masala with Roti and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "600-650",
                "details": "Rajma Masala with Brown Rice - 1 cup rajma masala, 1.5 cups brown rice, 1 side salad of cucumber and onion",
                "img": "",
                "name": "Rajma Masala with Brown Rice and Salad",
                "status": "pending"
              }
            }
          },
          "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKBqXtw-OAmrXw8x7EEyadQminKllgnfx17LURc8RXLNLgMJzgX=s96-c",
          "preference": "veg",
          "targetBody": "Bulk",
          "title": "Test 1"
        },
        "-O7tcQlWKzsOLKBKulEZ": {
          "allergies": "peanuts",
          "createdAt": "2024-09-28 17:15:25",
          "day": "2",
          "deleted": true,
          "diabetes": "Normal",
          "displayName": "Avinash Kumar",
          "isActive": false,
          "meals": {
            "Day1": {
              "breakfast": {
                "calories": "450-500",
                "details": "Oats Porridge (made with milk and topped with chopped fruits like banana, apple, pomegranate) + 6 Almonds + 3 Walnuts",
                "img": "",
                "name": "Oats Porridge with Fruits and Nuts",
                "status": "pending"
              },
              "dinner": {
                "calories": "550-600",
                "details": "Paneer Tikka Masala (made with low-fat paneer) + 1 cup Brown Rice + Salad (Onion, Tomato)",
                "img": "",
                "name": "Paneer Tikka Masala with Brown Rice and Salad ",
                "status": "pending"
              },
              "lunch": {
                "calories": "600-650",
                "details": "2 Chapatis + 1 cup Moong Dal + 1 cup Mixed Vegetable Curry + Salad (Cucumber, Carrot)",
                "img": "",
                "name": "Dal, Roti, Sabzi, Salad",
                "status": "pending"
              }
            },
            "Day2": {
              "breakfast": {
                "calories": "400-450",
                "details": "Besan Chilla (2 pieces) with Onion and Tomato Chutney + 1 Glass Buttermilk",
                "img": "",
                "name": "Besan Chilla with Chutney and Buttermilk",
                "status": "pending"
              },
              "dinner": {
                "calories": "500-550",
                "details": "Palak Paneer + 2 Missi Roti + Salad (Onion, Cucumber)",
                "img": "",
                "name": "Palak Paneer with Missi Roti and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "550-600",
                "details": "Rajma Chawal (Kidney Beans and Rice) + 1 cup Raita (Yogurt with Cucumber)",
                "img": "",
                "name": "Rajma Chawal with Raita",
                "status": "pending"
              }
            },
            "Day3": {
              "breakfast": {
                "calories": "450-500",
                "details": "Vegetable Poha (made with flattened rice, vegetables, and peanuts) + 1 cup Curd",
                "img": "",
                "name": "Vegetable Poha with Curd",
                "status": "pending"
              },
              "dinner": {
                "calories": "550-600",
                "details": "Malai Kofta (made with low-fat paneer) + 2 Tandoori Roti + Salad",
                "img": "",
                "name": "Malai Kofta with Tandoori Roti and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "600-650",
                "details": "Chole Bhature (2 Bhature, made with whole wheat flour) + Onion Salad",
                "img": "",
                "name": "Chole Bhature with Onion Salad",
                "status": "pending"
              }
            },
            "Day4": {
              "breakfast": {
                "calories": "400-450",
                "details": "Scrambled Tofu with Veggies (Onion, Tomato, Spinach) + 2 Multigrain Toast",
                "img": "",
                "name": "Scrambled Tofu with Veggies and Toast",
                "status": "pending"
              },
              "dinner": {
                "calories": "500-550",
                "details": "Dal Makhani + 1 cup Jeera Rice + Salad",
                "img": "",
                "name": "Dal Makhani with Jeera Rice and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "550-600",
                "details": "2 Aloo Paratha + 1 cup Curd + Pickle",
                "img": "",
                "name": "Aloo Paratha with Curd and Pickle ",
                "status": "pending"
              }
            },
            "Day5": {
              "breakfast": {
                "calories": "450-500",
                "details": "Sprouts Salad with chopped vegetables and lemon dressing + 1 glass Milk",
                "img": "",
                "name": "Sprouts Salad with Milk",
                "status": "pending"
              },
              "dinner": {
                "calories": "550-600",
                "details": "Shahi Paneer + Naan + Salad",
                "img": "",
                "name": "Shahi Paneer with Naan and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "600-650",
                "details": "Vegetable Biryani (made with brown rice) + Raita",
                "img": "",
                "name": "Vegetable Biryani with Raita",
                "status": "pending"
              }
            },
            "Day6": {
              "breakfast": {
                "calories": "400-450",
                "details": "Paneer Sandwich (made with multigrain bread, low-fat paneer, and vegetables) + 1 Banana",
                "img": "",
                "name": "Paneer Sandwich with Banana",
                "status": "pending"
              },
              "dinner": {
                "calories": "500-550",
                "details": "Vegetable Pulao + Dal Tadka + Salad",
                "img": "",
                "name": "Vegetable Pulao with Dal Tadka and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "550-600",
                "details": "Masala Dosa + Sambar + Chutney",
                "img": "",
                "name": "Masala Dosa with Sambar and Chutney",
                "status": "pending"
              }
            },
            "Day7": {
              "breakfast": {
                "calories": "450-500",
                "details": "Fruit and Yogurt Parfait (Greek yogurt layered with fruits like mango, banana, and granola)",
                "img": "",
                "name": "Fruit and Yogurt Parfait",
                "status": "pending"
              },
              "dinner": {
                "calories": "550-600",
                "details": "Kadai Paneer + 1 cup Steamed Rice + Salad",
                "img": "",
                "name": "Kadai Paneer with Steamed Rice and Salad",
                "status": "pending"
              },
              "lunch": {
                "calories": "600-650",
                "details": "2 Aloo Gobhi Paratha + 1 cup Curd + Pickle",
                "img": "",
                "name": "Aloo Gobhi Paratha with Curd and Pickle",
                "status": "pending"
              }
            }
          },
          "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKBqXtw-OAmrXw8x7EEyadQminKllgnfx17LURc8RXLNLgMJzgX=s96-c",
          "preference": "veg",
          "targetBody": "Bulk",
          "title": "Test 3"
        }
      },
      "info": {
        "age": "28",
        "bio": "Work out",
        "displayName": "Avinash Kumar",
        "email": "avinashkumar2rock@gmail.com",
        "emailVerified": true,
        "height": "178",
        "joinAt": "2024-09-28 20:45:50",
        "location": "Delhi",
        "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKBqXtw-OAmrXw8x7EEyadQminKllgnfx17LURc8RXLNLgMJzgX=s96-c",
        "preference": "veg",
        "uid": "1xFUPmeka1fftYDS4KVHbrJshTy2",
        "weight": "68"
      }
    }
  },
  "website": {
    "banner": {
      "val": "Health Gym Running Food Meal"
    }
  }
}
```

