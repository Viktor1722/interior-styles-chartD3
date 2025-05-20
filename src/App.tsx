import React from "react";
import "./App.css";
import SearchVolumeChart from "./components/SearchVolumeChart";
import EuropeStyleMap from "./components/EuropeStyleMap";
import { searchVolumeData, countryStyleData } from "./data/roomData";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interior Design Style Analysis</h1>
      </header>
      <main style={{ padding: "20px" }}>
        <section className="chart-section">
          <SearchVolumeChart data={searchVolumeData} />
        </section>

        <section className="chart-section">
          <h2>European Popular Style Preferences</h2>
          <EuropeStyleMap data={countryStyleData} />
        </section>

        <div className="description">
          <h1>
            📊 Style Popularity & Trends: Visualizing AI Interior Style
            Preferences
          </h1>

          <section>
            <h2>🧠 Purpose</h2>
            <p>
              This visualization explores interior design style preferences
              across the Europe. The data combines Google search volumes and
              regional style preferences to provide insights into current trends
              and geographical variations.
            </p>
          </section>

          <section>
            <h2>📈 Key Insights from UK Search Data</h2>
            <ul>
              <li>
                <strong>Vintage</strong> leads with 48,560 monthly searches,
                showing strong interest in classic designs.
              </li>
              <li>
                <strong>Industrial</strong> and <strong>Contemporary</strong>{" "}
                styles follow closely, indicating modern taste preferences.
              </li>
              <li>
                <strong>Scandinavian</strong> design maintains significant
                interest with over 33,000 monthly searches.
              </li>
              <li>
                <strong>Rustic</strong> and <strong>Coastal</strong> styles show
                substantial search volumes, suggesting diverse style
                preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2>🗺️ European Style Distribution</h2>
            <ul>
              <li>
                Northern Europe shows a strong preference for Scandinavian
                design
              </li>
              <li>
                Southern European countries tend toward Mediterranean and Luxury
                styles
              </li>
              <li>
                Central Europe displays diverse preferences, from Bauhaus to
                Industrial
              </li>
              <li>Western Europe favors Contemporary and Modern styles</li>
            </ul>
          </section>

          <section>
            <h2>💡 Why This Matters</h2>
            <ul>
              <li>
                Helps understand regional design preferences and cultural
                influences
              </li>
              <li>
                Guides interior designers and retailers in market-specific
                approaches
              </li>
              <li>
                Provides insights for trend forecasting and product development
              </li>
            </ul>
          </section>

          <section>
            <h2>🧪 Data Sources</h2>
            <ul>
              <li>UK search volume data from Google Keyword Planner</li>
              <li>
                European style preferences based on regional market analysis
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
