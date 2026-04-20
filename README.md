import os

readme_content = """# Data-Driven Urbanism: Portfolio V2026
**Karla Rocío Izunza Coéllar** *Urbanista (UNAM) y Científica de Datos Especializada (ORACLE - NEXT GENERATION / ALURA)*

Este repositorio contiene el desarrollo técnico y la visualización de dashboards interactivos aplicados al análisis urbano y geoespacial.

## 1. Propósito del análisis realizado
El objetivo central de este proyecto es integrar la ciencia de datos con la planificación urbana para transformar datos masivos en evidencia accionable. A través de este portafolio, se presentan análisis complejos que decodifican la dinámica urbana en cuatro áreas críticas:

* **Viaja Segura:** Transformación de operaciones analógicas en la periferia alta del sur de la CDMX en un modelo de datos estructurado para la validación técnica de servicios de transporte.

El análisis implementa flujos ETL y modelado GIS para correlacionar flujos de movilidad con nodos de equipamiento urbano relacionados con el cuidado, generando la evidencia necesaria para la toma de decisiones estratégicas.

* **Vigilancia Espectral:** Machine Learning: Auditoría ambiental mediante clasificación supervisada de imágenes satelitales para cuantificar la presión antrópica sobre ecosistemas de manglar en Dorado, Puerto Rico.

El análisis utiliza índices multiespectrales (NDVI/NDWI) para validar la integridad de la segmentación y evidencia el confinamiento del litoral mediante modelado geoespacial avanzado. 

* **Algoritmo Inmobiliario:** Intelligence de Mercado: Análisis cuantitativo de la dinámica de la plataforma de hospedaje en Hong Kong para tangibilizar la financiarización de la vivienda en entornos de hiperdensidad.

A través de SQL (PostgreSQL) y Python, se modelan datos masivos para identificar clústeres de especulación y el volumen de stock habitacional transformado en activos financieros.

* **Factor de Esfuerzo Turístico:** Data Analysis: Modelado de proximidad y fragmentación territorial en la red ferroviaria japonesa para cuantificar el 'Costo Oculto' de la eficiencia del Shinkansen.

Este proyecto mide la desigualdad de acceso mediante la minería de datos espaciales, evaluando el esfuerzo físico necesario para conectar con el patrimonio regional desconectado de la red principal.

## 2. Estructura del proyecto y organización de los archivos
El proyecto está construido bajo una arquitectura modular en **React + Vite**, permitiendo que cada análisis funcione como una vista independiente pero consistente.

/src
├── components/           # Componentes modulares del sistema
│   ├── ViajaSegura/      # Análisis de movilidad y cuidados al sur de CDMX
│   ├── VigilanciaEspectral/ # Auditoría de litoral y ambiental en Puerto R.
│   ├── AlgoritmoInmobiliario/ # Dinámica de la plataforma airbnb en H.K.
│   ├── FactorEsfuerzo/  # Métricas de accesibilidad y última milla en Japón
│   └── Shared/           # Layouts y tarjetas de proyecto reutilizables
├── data/                 # Capas de datos (GeoJSON y archivos JSON de soporte)
├── config/               # Configuración centralizada de temas y estilos
├── context/              # Gestión de estado global (Idiomas ES/EN)
└── App.jsx               # Orquestador principal de la aplicación

## 3. Ejemplos de insights obtenidos
A partir del análisis de datos geoespaciales y la implementación de dashboards interactivos, se han extraído los siguientes hallazgos:

Movilidad y Economía de Cuidados (Viaja Segura):

-Eje de Integración: Se identifica una conexión vital entre la periferia alta (Oyamel, Ocotal, Antigua) y equipamientos regionales estratégicos como Ciudad Universitaria.

-Validación de la Demanda: Legitimación de rutas de transporte como eslabones fundamentales en la red de movilidad de cuidados.

Auditoría de Litoral (Vigilancia Espectral):

-Fractura Estructural: El análisis revela una alta superficie de inversión inmobiliaria, confirmando procesos de mercantilización intensiva del suelo.

-ipótesis del Confinamiento: Se detectó que la conjunción de barreras arquitectónicas y naturales puede estar anulando el acceso público a las playas garantizado por ley.


Mercado de Vivienda (Algoritmo Inmobiliario):

-Stock Mercantilizado: Cuantificación de unidades extraídas del mercado tradicional que superan la capacidad de absorción local.

-Clústeres de Especulación: Identificación de zonas de alta intensidad especulativa en distritos como Yau Tsim Mong y Central & Western.

Accesibilidad e Infraestructura (Factor de Esfuerzo):

-Sesgo de Centralización: La infraestructura prioriza nodos comerciales densos, aumentando el esfuerzo necesario para acceder al patrimonio histórico.

-Métricas de Última Milla: Detección de zonas donde el esfuerzo de traslado excede los radios de caminabilidad estándar (1km), evidenciando brechas críticas de conectividad.

## 4. Instrucciones para ejecutar el proyecto
Para visualizar el dashboard de manera local y explorar los datos interactivos, estas son las instrucciones:

Requisitos: Node.js instalado en el sistema.

Clonación e Instalación:

Bash
git clone https://github.com/roizunza/portfolio-v2026.git
cd portfolio-v2026
npm install
Despliegue Local:

Bash
npm run dev
Uso: Accede a http://localhost:5173 para interactuar con los dashboards y cambiar entre los idiomas disponibles (ES/EN).

---
