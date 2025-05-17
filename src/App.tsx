import React from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import { roomData } from "./data/roomData";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Room Style Distribution Chart</h1>
      </header>
      <main style={{ padding: "20px" }}>
        <BarChart data={roomData} />

        <div className="description">
          <h1>
            📊 Style Popularity & Trends: Visualizing AI Interior Style
            Preferences
          </h1>

          <section>
            <h2>🧠 Purpose</h2>
            <p>
              This visualization was created to explore how users interact with
              my AI-powered room restyling tool. The goal is to identify which
              interior design styles are most frequently selected, helping guide
              further model fine-tuning and feature development.
            </p>
          </section>

          <section>
            <h2>📈 The Visualization</h2>
            <p>
              The bar chart shows the popularity of four interior design
              styles—Scandinavian, Minimalist, Industrial, and Boho—based on
              user selections from a mock dataset. Each data point represents a
              transformation request, including the chosen style, room type, and
              date.
            </p>
            <p>
              The chart uses D3.js and offers an interactive way to view user
              preferences. You can filter the results by room type to see how
              styles vary between spaces like bedrooms, kitchens, and living
              rooms.
            </p>
          </section>

          <section>
            <h2>🔍 Key Insights</h2>
            <ul>
              <li>
                <strong>Scandinavian</strong> style is the most commonly chosen
                across all room types, especially in bedrooms.
              </li>
              <li>
                <strong>Minimalist</strong> style is popular in living rooms,
                suggesting a preference for clean layouts in shared spaces.
              </li>
              <li>
                <strong>Industrial</strong> is frequently selected for
                kitchens—possibly due to its functional and raw aesthetic.
              </li>
              <li>
                <strong>Boho</strong> style is less common but appears more
                often in bedrooms, hinting at a niche audience.
              </li>
            </ul>
          </section>

          <section>
            <h2>💡 Why This Matters</h2>
            <p>These insights help us:</p>
            <ul>
              <li>Understand user preferences and improve style presets.</li>
              <li>
                Make better UI/UX decisions by featuring popular styles more
                prominently.
              </li>
              <li>
                Inform future fine-tuning of the AI model to better serve user
                expectations.
              </li>
            </ul>
          </section>

          <section>
            <h2>🧪 Notes</h2>
            <ul>
              <li>
                The data used in this visualization is mocked for demonstration
                purposes.
              </li>
              <li>
                In a real-world deployment, this data would come from logged
                user interactions.
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
