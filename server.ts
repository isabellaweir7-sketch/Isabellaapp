import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Endpoint: Smart AI Gift Genie
  app.post("/api/gemini/suggest", async (req, res) => {
    try {
      const {
        friendName = "Bestie",
        relationship = "Friend",
        favoriteShops = [],
        favoriteColors = [],
        favoriteSnacks = [],
        favoriteDrinks = [],
        clothingSize = "",
        shoeSize = "",
        jewelleryStyle = "",
        doNotWant = [],
        hobbies = [],
        budget = "35to75",
        vibe = "aesthetic & thoughtful",
      } = req.body;

      const ai = getAiClient();

      const prompt = `
You are the ultimate aesthetic gift curator for teenage girls and young adults ("WishList Gift Genie").
Curate 4 highly specific, delightful, trendy gift recommendations for a friend based on their profile.

Profile Details:
- Name: ${friendName}
- Relationship: ${relationship}
- Favorite Shops: ${favoriteShops.join(", ") || "Sephora, Glossier, Lululemon, Brandy Melville, Jellycat, Target, Etsy"}
- Favorite Colors: ${favoriteColors.join(", ") || "Pastel pink, sage green, soft lavender"}
- Favorite Snacks & Drinks: ${favoriteSnacks.join(", ")}, ${favoriteDrinks.join(", ")}
- Clothing & Shoe Size: ${clothingSize} / Shoe: ${shoeSize}
- Jewellery Preferences: ${jewelleryStyle || "Gold dainty huggies & thin rings"}
- STRICT DO NOT WANT LIST: ${doNotWant.join(", ") || "None"}
- Hobbies: ${hobbies.join(", ") || "Pilates, thrifting, matcha"}
- Target Budget Range: ${budget} (under15 = under $15, 15to35 = $15-$35, 35to75 = $35-$75, splurge75 = $75+)
- Desired Vibe: ${vibe}

Rules:
1. RESPECT THE DO NOT WANT LIST ENTIRELY! If they say "NO silver", do NOT suggest silver. If "NO scented candles", do NOT suggest candles.
2. Give specific, real-world trending products that teen girls love (e.g. Sol de Janeiro, Glossier, SKIMS, Jellycat, Stanley cup accessories, Laneige lip sleeping mask, Lululemon belt bag, Mejuri, Anker cute portable charger, Kodak film camera, etc.).
3. Provide realistic estimated prices and stores.
4. Explain in 1 witty, sweet sentence why this friend specifically would love this gift.
5. Provide a priceTag matching one of: 'under15', '15to35', '35to75', 'splurge75'.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are WishList Gift Genie, an expert in Gen-Z/teen girl gift trends, aesthetic items, and thoughtful gift picking. Always return valid structured JSON matching the schema.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Specific product name" },
                price: { type: Type.STRING, description: "Formatted price e.g. '$28'" },
                store: { type: Type.STRING, description: "Store name e.g. Sephora" },
                reason: { type: Type.STRING, description: "Why they would love it" },
                category: { type: Type.STRING, description: "Category e.g. Beauty, Fashion, Tech, Cozy" },
                affiliateUrl: { type: Type.STRING, description: "Simulated store search link" },
                priceTag: {
                  type: Type.STRING,
                  description: "Price tier tag: under15, 15to35, 35to75, splurge75",
                },
              },
            },
          },
        },
      });

      const jsonText = response.text?.trim() || "[]";
      const suggestions = JSON.parse(jsonText);
      res.json({ success: true, suggestions });
    } catch (err: any) {
      console.error("Error generating gift suggestions:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to generate AI gift suggestions",
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "WishList" });
  });

  // Vite middleware for development vs Static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WishList App Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
