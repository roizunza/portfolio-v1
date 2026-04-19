export const certificaciones = [
  {
    id: "data-science",
    categoria: "Data Science & Machine Learning",
    colorHex: "#FF007A", 
    institucion: "G9 - ONE / Alura LATAM",
    horasTotales: 184,
    certificadoEspecialidad: "/assets/certificados/CERTIFICADO_FINAL_ALURA_CIENCIA_DATOS.pdf",
    formaciones: [
      {
        nombre: "Aprendiendo a hacer ETL",
        horas: 70,
        cursos: [
          { nombre: "NumPy: análisis numérico eficiente", link: "/assets/certificados/PYTHON_NUMPY.pdf" },
          { nombre: "Pandas: transformación y manipulación", link: "/assets/certificados/PYTHON_PANDAS.pdf" },
          { nombre: "Visualización de datos con Python", link: "/assets/certificados/PYTHON_VISUALIZACION.pdf" }
        ]
      },
      {
        nombre: "Estadísticas y Machine Learning",
        horas: 65,
        cursos: [
          { nombre: "Estadística con Python", link: "/assets/certificados/PYTHON_ESTADISTICA.pdf" },
          { nombre: "Regresión lineal y modelado", link: "/assets/certificados/CIENCIA_DATOS_REGRESION_LINEAL.pdf" },
          { nombre: "Clasificación con Machine Learning", link: "/assets/certificados/CIENCIA_DATOS_MACHINE_LEARNING.pdf" }
        ]
      }
    ]
  },
  {
    id: "programacion",
    categoria: "Desarrollo Web & Programación",
    colorHex: "#00FF66",
    institucion: "G9 - ONE / Alura LATAM",
    horasTotales: 99,
    certificadoEspecialidad: "/assets/certificados/CERTIFICADO_FINAL_ALURA_PROGRAMACION.pdf",
    formaciones: [
      {
        nombre: "Principiante en Programación",
        horas: 76,
        cursos: [
          { nombre: "Lógica de programación: JavaScript", link: "/assets/certificados/LOGICA_JS.pdf" },
          { nombre: "Git y GitHub: versiones", link: "/assets/certificados/GIT_GITHUB.pdf" }
        ]
      }
    ]
  },
  {
    id: "geointeligencia",
    categoria: "Geointeligencia y Gobernanza",
    colorHex: "#00E5FF",
    institucion: "ITDP / GIZ / INAFED",
    horasTotales: 120,
    certificadoEspecialidad: "/assets/certificados/INAFED-2025_002178-120997.pdf",
    formaciones: [
      { nombre: "Digitalización del Transporte Público", horas: 120, cursos: [] }
    ]
  }
];