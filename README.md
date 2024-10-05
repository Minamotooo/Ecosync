# Project ECOSYNC

![Project Banner](Frontend/public/images/usd.png)


## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Client Side](#clien-tside)
    - [Interactive Global Map](#interactive-global-map)
        - [Features](#globe-features)
        - [Technologies Used](#globe-technologies-used)
        - [NASA Datasets and APIs used](#globe-datasets)
    - [Gamified Learning](#gamified-learning)
        - [Features](#gamified-learning-features)
        - [Technologies Used](#gamified-learning-technologies-used)
        - [NASA Datasets and APIs used](#gamified-learning-datasets)
- [Server Side](#server-side)
  - [Nasa Datasets and APIs](#server-side-datasets)
  - [Advanced Data Analysis and ML/DL models](#server-side-models)
  - [Technologies Used](#server-side-technologies-used)
- [Miscellanous](#miscellanous)
    - [Technologies Used](#miscellanous-technologies-used)
- [Contributors](#contributors)

---

## Introduction

EcoSync leverages real-time NASA data to visualize Earth's interconnected systems through an interactive globe and educational games. Users can explore key environmental data such as ozone levels, tree cover, droughts, wildfires, temperatures, and CO₂ emissions. By integrating comprehensive sources like NASA’s AIRS Satellite and Berkeley Earth, EcoSync provides a holistic view of climate changes. Its predictive analytics forecast future temperatures and sea levels, while heatmap correlations and risk analyses offer deeper insights. Aiming to transform public understanding, EcoSync makes complex climate data accessible and engaging, empowering users to make informed decisions to address global challenges.

## Installation

Provide step-by-step instructions on how to install your project.

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/yourproject.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd frontend
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Start the application:**
    ```bash
    npm start
    ```
## Client Side 

### Interactive Global Map

#### Features

##### **3D Tiles Visualization**:
- Displays photorealistic 3D tiles of Earth's terrain and buildings.

---

##### **Environmental Visualizations**:

1. **Carbon Dioxide Emission Visualization:**
    Shows global CO2 emission data.

2. **Ozone Layer Visualization:**
    Displays the ozone layer as a transparent global overlay.

3. **Tree Cover Visualization:**
    Highlights global tree cover and forest density.

4. **Global Temperature Visualization:**
    Presents a heatmap representing global temperature trends.

5. **Drought Visualization:**
    Maps drought-affected regions on the globe.

6. **Wildfire Visualization:**
    Displays active fire hotspots with color-coded markers based on fire intensity.

7. **River Visualization:**
    Highlights major rivers with flowing dashed lines.

8. **Sea Level Rise Visualization:**
    Shows projected areas of land submerged due to rising sea levels.

9. **Landslide Probability Visualization:**
    Displays regions with a high likelihood of landslides based on environmental data.

10. **Air Quality Visualization:**
     Maps air quality levels with a focus on pollutant concentrations.

---

##### **Custom Region and Simulation Feature**:

- **Custom Region Highlighting & Earth Systems Simulation:**
  - Allows users to draw polygons on the globe to highlight specific regions, and run simulations of changing Earth systems and natural disasters using a Deep Learning model (LSTM).
  - Provides an option to customize the parameters of each simulation based on different environmental variables.
  - Offers time-lapse animations showing the evolution of Earth systems over time.
  - Enables sharing of simulation results and visualizations on social media or with research teams.
  - Displays detailed analytics and predictions based on LSTM results.


#### Technologies Usesd

### **Frameworks**

| Name                                                                                                      | Description                                                                                                    |
|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| [![Cesium.js](https://img.shields.io/badge/Cesium.js-blue)](https://cesium.com/platform/cesiumjs/)        | For building the interactive global map                                                |
| [![Resium.js](https://img.shields.io/badge/Resium.js-green)](https://resium.darwin-education.de/)        | React components for CesiumJS to build interactive maps.                                                      |


#### NASA Datasets and APIs Used
| Name                                                                                                      | Description                                                                                                      |
|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| [![NASA MERRA-2 Data](https://img.shields.io/badge/NASA%20MERRA-2%20Data-orange)](https://gmao.gsfc.nasa.gov/reanalysis/MERRA-2/) | Atmospheric reanalysis data from NASA.                                                                           |
| [![NASA FIRMS Data](https://img.shields.io/badge/NASA%20FIRMS%20Data-red)](https://firms.modaps.eosdis.nasa.gov/) | Fire information from NASA's Fire Information for Resource Management System.                                     |
| [![NASA AIRS Data](https://img.shields.io/badge/NASA%20AIRS%20Data-purple)](https://airs.jpl.nasa.gov/) | Atmospheric data from NASA's Atmospheric Infrared Sounder.                                                        |
| [![Global Maps (MODIS sensor of Terra)](https://img.shields.io/badge/Global%20Maps%20(MODIS%20sensor%20of%20Terra)-yellow)](https://modis.gsfc.nasa.gov/data/) | Earth observation data from the MODIS sensor on the Terra satellite.                                              |
| [![Simone Primarosa's Geo-Maps](https://img.shields.io/badge/Simone%20Primarosa's%20Geo--Maps-pink)](https://github.com/sprimarosa/geo-maps) | Customized geospatial maps by Simone Primarosa.                                                                  |
| [![Berkeley Earth](https://img.shields.io/badge/Berkeley%20Earth-gray)](http://berkeleyearth.org/) | Global temperature data and analyses.                                                                             |
| [![Our World in Data](https://img.shields.io/badge/Our_World_in_Data-blueviolet)](https://ourworldindata.org/) | Comprehensive data and research on global issues.                                                                  |

### Gamified Learning

#### Features

##### **Climate Cascade**
A platformer navigating climate-affected zones, overcoming challenges, and collecting NASA data to understand Earth systems.

##### **Wildfire Warrior**
An arcade shooter where players extinguish wildfires, manage resources, and learn about drought’s impact on air quality.

##### **Ocean Odyssey**
A fishing game balancing marine life collection with managing ocean health amid rising temperatures.

##### **Deforestation Defender**
A tower-defense game protecting forests from logging and fires, emphasizing conservation and sustainable practices.

##### **Water Cycle Quest**
A puzzle game managing water distribution to maintain ecosystems and address environmental disruptions.

##### **Air Quality Adventure**
A runner game collecting clean air tokens while avoiding pollution, highlighting industrial emissions' effects.

#### Technologies Used
| Name                                                                                                      | Description                                                                                                    |
|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| [![Phaser.js](https://img.shields.io/badge/Phaser.js-purple)](https://phaser.io/)                        | To make the interactice 2D games that utilize NASA Datasets.                                       |
| [![React Phaser.js](https://img.shields.io/badge/React%20Phaser.js-orange)](https://github.com/samme/react-phaser) | A React wrapper for integrating Phaser.js in React applications.                                               |

#### NASA Datasets and APIs Used

##### **Climate Cascade**
- **Visuals:** Incorporates satellite imagery of different climate regions (forest, desert and polar regions)
- **Data Points:** Displays real-time climate data overlays, including temperature, biodiversity, soil water level and sea level trends.

##### **Wildfire Warrior**
- **Fire Data:** Utilizes NASA’s MODIS (Moderate Resolution Imaging Spectroradiometer) data to represent real-time wildfire locations and intensities.
- **Air Quality:** Integrates data on particulate matter levels from satellite observations.

##### **Ocean Odyssey**
- **Sea Surface Temperature:** Uses NASA’s sea surface temperature data to dynamically alter ocean conditions within the game.
- **Marine Health Indicators:** Incorporates satellite data on sea level changes and water quality & tempearature changes.

##### **Deforestation Defender**
- **Forest Cover Maps:** Employs NASA’s Landsat data to represent real-time forest cover and deforestation rates.
- **Carbon Emissions Data:** Integrates data on carbon storage and emissions from deforested areas.

##### **Water Cycle Quest**
- **Precipitation Data:** Utilizes NASA’s Global Precipitation Measurement (GPM) data to influence water availability in the game.

##### **Air Quality Adventure**
- **Air Quality Index (AQI):** Uses NASA’s AQI data to dynamically adjust pollution levels within the game.

## Server Side

### NASA Datasets, APIs, models
**Models**
| Name                                                                                                 | Description                                                                                     |
|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| [![Prophet](https://img.shields.io/badge/Prophet-blue)](https://facebook.github.io/prophet/)        | Time Series Forecasting model used for predicting climate trends.                              |
| [![LSTM](https://img.shields.io/badge/LSTM-red)](https://en.wikipedia.org/wiki/Long_short-term_memory) | Long Short-Term Memory model for forecasting CO₂ levels and temperature anomalies.              |


**Datasets**

| Name                                                                                                  | Description                                                                                                      |
|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| [![NOAA MLOST](https://img.shields.io/badge/NOAA%20MLOST-blue)](https://www.ngdc.noaa.gov/mgg/molst/) | Temperature Prediction dataset from NOAA's Multi-scale Land Observations to Satellite (MLOST).                   |
| [![NASA GISTEMP](https://img.shields.io/badge/NASA%20GISTEMP-orange)](https://data.giss.nasa.gov/gistemp/) | NASA's Global Surface Temperature Analysis for Temperature Prediction.                                         |
| [![NASA GMSL](https://img.shields.io/badge/NASA%20GMSL-green)](https://climate.nasa.gov/vital-signs/sea-level/) | NASA's Global Mean Sea Level (GMSL) dataset for Sea Level Prediction.                                           |
| [![US Drought Monitor](https://img.shields.io/badge/US%20Drought%20Monitor-yellow)](https://droughtmonitor.unl.edu/) | Drought data from the US Drought Monitor, providing comprehensive drought information across the United States. |
| [![EPA Air Quality](https://img.shields.io/badge/EPA%20Air%20Quality-purple)](https://www.epa.gov/outdoor-air-quality-data) | Air Quality (PM2.5) data sourced from the Environmental Protection Agency (EPA).                                |
| [![NASA FIRMS](https://img.shields.io/badge/NASA%20FIRMS-red)](https://firms.modaps.eosdis.nasa.gov/) | Wildfire data from NASA's Fire Information for Resource Management System (FIRMS) using MODIS Satellite data.    |
| [![NASA Landslide Analysis](https://img.shields.io/badge/NASA%20Landslide%20Analysis-pink)](https://www.nasa.gov/goddard) | Landslide Trigger Analysis data from NASA Goddard Space Flight Center.                                           |
| [![Global CO₂ Emissions](https://img.shields.io/badge/Global%20CO₂%20Emissions-gray)](https://www.globalcarbonproject.org/) | Global CO₂ Emissions Data (1940-2023) sourced from the Global Carbon Project for emissions data analysis.        |


**APIs**

| Name                                                                                          | Description                                                                                                           |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [![NASA FIRMS API](https://img.shields.io/badge/NASA%20FIRMS%20API-blue)](https://firms.modaps.eosdis.nasa.gov/api/) | NASA's Fire Information for Resource Management System (FIRMS) API for accessing real-time wildfire data.             |
| [![NASA CMR API](https://img.shields.io/badge/NASA%20CMR%20API-green)](https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html) | NASA's Common Metadata Repository (CMR) API for accessing a wide range of Earth science data and metadata.            |

### Advanced Data Analysis and ML 

### **Models (In the Notebooks)**

| Name                                           | Description                                                                                                  |
|------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| [LSTM](https://github.com/Minamotooo/Ecosync/tree/main/Backend/LSTM)                             | Long Short-Term Memory model for analyzing and forecasting CO₂ levels and temperature anomalies.            |
| [Data Analysis](https://github.com/Minamotooo/Ecosync/tree/main/Backend/data%20analysis)        | Comprehensive data analysis framework for processing and interpreting various NASA datasets.                |
| [InterConnected Systems](https://github.com/Minamotooo/Ecosync/tree/main/Backend/interconnected%20systems) | Correlation analysis model examining the relationships between drought, air quality, and wildfire occurrences. |
| [Landslide](https://github.com/Minamotooo/Ecosync/tree/main/Backend/landslide)                   | Data analysis model studying the correlation between global temperature variations and landslide incidents.    |


### Technologies Used
| Name                                                                                                      | Description                                                                                                    |
|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| [![Python](https://img.shields.io/badge/Python-blue)](https://www.python.org/)                            | Key programming language for performing data analysis on NASA datasets and developing ML/DL models.            |
| [![Matplotlib](https://img.shields.io/badge/Matplotlib-yellow)](https://matplotlib.org/)                  | Used to visualize NASA data and model predictions.                                                             |
| [![Seaborn](https://img.shields.io/badge/Seaborn-lightblue)](https://seaborn.pydata.org/)                | Enhances Matplotlib visualizations with advanced statistical graphics.                                         |
| [![Pandas](https://img.shields.io/badge/Pandas-green)](https://pandas.pydata.org/)                      | Facilitates visualization and manipulation of structured data from NASA datasets.                             |
| [![NumPy](https://img.shields.io/badge/NumPy-purple)](https://numpy.org/)                               | Performs numerical analysis on NASA datasets, enabling efficient data processing.                             |
| [![Jupyter Notebook](https://img.shields.io/badge/Jupyter%20Notebook-orange)](https://jupyter.org/)      | Runs ML/DL simulations and conducts comprehensive analyses on NASA datasets interactively.                    ||

## Miscellanous

### Techonologies Used

| Name                                                                 | Description                                                                                           |
|----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| [![React](https://img.shields.io/badge/React-blue)](https://reactjs.org/) | A JavaScript library for building user interfaces, particularly single-page applications.            |
| [![Chart.js](https://img.shields.io/badge/Chart.js-red)](https://www.chartjs.org/) | A flexible JavaScript charting library for designers & developers, enabling interactive data visualizations. |

## Contributors
| Name                                                                                                      | Description     |
|-----------------------------------------------------------------------------------------------------------|-----------------|
| [![GitHub azraihan](https://img.shields.io/badge/GitHub-azraihan-black?logo=github&logoColor=white)](https://github.com/azraihan)             | Backend & research, Game Development  |
| [![GitHub rwd51](https://img.shields.io/badge/GitHub-rwd51-black?logo=github&logoColor=white)](https://github.com/rwd51)                   | Backend, Data Analysis, and AI/ML/DL specialist|
| [![GitHub SonOfTheSea21](https://img.shields.io/badge/GitHub-SonOfTheSea21-black?logo=github&logoColor=white)](https://github.com/SonOfTheSea21) | Frontend developer and UI/UX designer |
| [![GitHub Minamotooo](https://img.shields.io/badge/GitHub-Minamotooo-black?logo=github&logoColor=white)](https://github.com/Minamotooo)         | Frontend developer and UI/UX designer   |
