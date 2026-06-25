package backend.service;

import backend.model.*;
import backend.repository.*;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.List;

@Service
public class PdfService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PadreEstudianteRepository padreEstudianteRepository;

    @Autowired
    private CalificacionRepository calificacionRepository;

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private MatriculaRepository matriculaRepository;

    // =========================
    // COLORES COMUNES
    // =========================
    private final BaseColor azul = new BaseColor(25, 45, 90);
    private final BaseColor gris = new BaseColor(245, 245, 245);
    private final BaseColor rojo = new BaseColor(180, 0, 0);
    private final BaseColor verde = new BaseColor(0, 128, 0);

    // =========================
    // ENCABEZADO COMUN (Logo + Colegio)
    // =========================
    private void agregarEncabezado(Document document) throws Exception {
        try {
            Image logo = Image.getInstance("src/main/resources/static/img/LogoColegio.jpg");
            logo.scaleToFit(80, 80);
            logo.setAlignment(Element.ALIGN_CENTER);
            document.add(logo);
        } catch (Exception e) {
            System.out.println("No se encontro el logo");
        }

        Font titulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, azul);
        Font lema = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11, BaseColor.BLACK);

        Paragraph colegio = new Paragraph("C.E.P. LA SAGRADA FAMILIA", titulo);
        colegio.setAlignment(Element.ALIGN_CENTER);
        document.add(colegio);

        Paragraph textoLema = new Paragraph("Educacion - Disciplina - Trabajo", lema);
        textoLema.setAlignment(Element.ALIGN_CENTER);
        document.add(textoLema);

        document.add(new Paragraph(" "));
    }

    // =========================
    // METODO CELDAS
    // =========================
    private PdfPCell crearCelda(String texto, Font font) {
        PdfPCell celda = new PdfPCell(new Phrase(texto, font));
        celda.setPadding(6);
        return celda;
    }

    private PdfPCell crearCeldaTitulo(String texto, Font font, BaseColor colorFondo) {
        PdfPCell celda = new PdfPCell(new Phrase(texto, font));
        celda.setBackgroundColor(colorFondo);
        celda.setHorizontalAlignment(Element.ALIGN_CENTER);
        celda.setPadding(8);
        return celda;
    }

    // =========================
    // 1. FICHA DE MATRICULA (ya existente)
    // =========================
    public byte[] generarFichaMatricula(Integer idEstudiante) {
        try {
            Estudiante estudiante = estudianteRepository.findById(idEstudiante).orElse(null);
            if (estudiante == null) return null;

            Matricula matricula = estudiante.getMatricula();
            List<PadreEstudiante> relaciones = padreEstudianteRepository
                    .findByEstudiante_IdEstudiante(idEstudiante);

            Document document = new Document(PageSize.A4, 30, 30, 20, 20);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            agregarEncabezado(document);

            Font subtitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK);
            Font texto = FontFactory.getFont(FontFactory.HELVETICA, 11, BaseColor.BLACK);
            Font textoBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11, BaseColor.BLACK);

            // Titulo
            PdfPTable tituloTabla = new PdfPTable(1);
            tituloTabla.setWidthPercentage(100);
            PdfPCell tituloCell = new PdfPCell(new Phrase("FICHA DE MATRICULA",
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, BaseColor.WHITE)));
            tituloCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            tituloCell.setBackgroundColor(azul);
            tituloCell.setPadding(10);
            tituloTabla.addCell(tituloCell);
            document.add(tituloTabla);
            document.add(new Paragraph(" "));

            // Datos Matricula
            PdfPTable tablaMatricula = new PdfPTable(2);
            tablaMatricula.setWidthPercentage(100);
            tablaMatricula.setSpacingBefore(10);

            PdfPCell header1 = new PdfPCell(new Phrase("DATOS DE MATRICULA", subtitulo));
            header1.setColspan(2);
            header1.setBackgroundColor(gris);
            header1.setPadding(8);
            tablaMatricula.addCell(header1);

            if (matricula != null) {
                tablaMatricula.addCell(crearCelda("Nivel", textoBold));
                tablaMatricula.addCell(crearCelda(matricula.getNivel(), texto));
                tablaMatricula.addCell(crearCelda("Grado", textoBold));
                tablaMatricula.addCell(crearCelda(matricula.getGrado(), texto));
                tablaMatricula.addCell(crearCelda("Seccion", textoBold));
                tablaMatricula.addCell(crearCelda(matricula.getSeccion(), texto));
                tablaMatricula.addCell(crearCelda("DNI", textoBold));
                tablaMatricula.addCell(crearCelda(matricula.getDni(), texto));
                tablaMatricula.addCell(crearCelda("Celular", textoBold));
                tablaMatricula.addCell(crearCelda(matricula.getCelular(), texto));
            }

            document.add(tablaMatricula);

            // Datos Estudiante
            PdfPTable tablaEstudiante = new PdfPTable(2);
            tablaEstudiante.setWidthPercentage(100);
            tablaEstudiante.setSpacingBefore(15);

            PdfPCell header2 = new PdfPCell(new Phrase("DATOS DEL ESTUDIANTE", subtitulo));
            header2.setColspan(2);
            header2.setBackgroundColor(gris);
            header2.setPadding(8);
            tablaEstudiante.addCell(header2);

            tablaEstudiante.addCell(crearCelda("Codigo", textoBold));
            tablaEstudiante.addCell(crearCelda(estudiante.getCodigoEstudiante(), texto));
            tablaEstudiante.addCell(crearCelda("Nombres", textoBold));
            tablaEstudiante.addCell(crearCelda(estudiante.getNombres(), texto));
            tablaEstudiante.addCell(crearCelda("Apellido Paterno", textoBold));
            tablaEstudiante.addCell(crearCelda(estudiante.getApellidoPaterno(), texto));
            tablaEstudiante.addCell(crearCelda("Apellido Materno", textoBold));
            tablaEstudiante.addCell(crearCelda(estudiante.getApellidoMaterno(), texto));
            tablaEstudiante.addCell(crearCelda("Sexo", textoBold));
            tablaEstudiante.addCell(crearCelda(estudiante.getSexo(), texto));
            tablaEstudiante.addCell(crearCelda("Edad", textoBold));
            tablaEstudiante.addCell(crearCelda(String.valueOf(estudiante.getEdad()), texto));
            tablaEstudiante.addCell(crearCelda("Direccion", textoBold));
            tablaEstudiante.addCell(crearCelda(estudiante.getDireccion(), texto));

            document.add(tablaEstudiante);

            // Datos Padres
            PdfPTable tablaPadres = new PdfPTable(5);
            tablaPadres.setWidthPercentage(100);
            tablaPadres.setSpacingBefore(15);

            PdfPCell header3 = new PdfPCell(new Phrase("DATOS DE LOS PADRES", subtitulo));
            header3.setColspan(5);
            header3.setBackgroundColor(gris);
            header3.setPadding(8);
            tablaPadres.addCell(header3);

            tablaPadres.addCell(crearCelda("Nombre Completo", textoBold));
            tablaPadres.addCell(crearCelda("DNI", textoBold));
            tablaPadres.addCell(crearCelda("Telefono", textoBold));
            tablaPadres.addCell(crearCelda("Tipo", textoBold));
            tablaPadres.addCell(crearCelda("Direccion", textoBold));

            for (PadreEstudiante relacion : relaciones) {
                Padre padre = relacion.getPadre();
                tablaPadres.addCell(crearCelda(padre.getNombres() + " " + padre.getApellidos(), texto));
                tablaPadres.addCell(crearCelda(padre.getDni(), texto));
                tablaPadres.addCell(crearCelda(padre.getTelefono(), texto));
                tablaPadres.addCell(crearCelda(padre.getTipo(), texto));
                tablaPadres.addCell(crearCelda(padre.getDireccion(), texto));
            }

            document.add(tablaPadres);

            document.add(new Paragraph(" "));
            Paragraph finalTexto = new Paragraph("Bienvenido a la Institucion Educativa C.E.P. La Sagrada Familia!",
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, rojo));
            finalTexto.setAlignment(Element.ALIGN_CENTER);
            document.add(finalTexto);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // =========================
    // 2. BOLETA DE CALIFICACIONES POR ESTUDIANTE
    // =========================
    public byte[] generarBoletaCalificaciones(Integer idEstudiante) {
        try {
            Estudiante estudiante = estudianteRepository.findById(idEstudiante).orElse(null);
            if (estudiante == null) return null;

            Matricula matricula = estudiante.getMatricula();
            List<Calificacion> calificaciones = calificacionRepository.findByEstudiante(idEstudiante);

            Document document = new Document(PageSize.A4, 25, 25, 20, 20);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            agregarEncabezado(document);

            Font subtitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK);
            Font texto = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);
            Font textoBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.BLACK);
            Font tituloTabla = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.WHITE);

            // Titulo del documento
            PdfPTable tituloDoc = new PdfPTable(1);
            tituloDoc.setWidthPercentage(100);
            PdfPCell tituloCell = new PdfPCell(new Phrase("BOLETA DE CALIFICACIONES",
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.WHITE)));
            tituloCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            tituloCell.setBackgroundColor(azul);
            tituloCell.setPadding(10);
            tituloDoc.addCell(tituloCell);
            document.add(tituloDoc);
            document.add(new Paragraph(" "));

            // Info del estudiante
            PdfPTable infoEst = new PdfPTable(4);
            infoEst.setWidthPercentage(100);
            infoEst.setSpacingBefore(5);

            infoEst.addCell(crearCelda("Estudiante:", textoBold));
            infoEst.addCell(crearCelda(estudiante.getNombres() + " " + estudiante.getApellidoPaterno() + " " + estudiante.getApellidoMaterno(), texto));
            infoEst.addCell(crearCelda("Codigo:", textoBold));
            infoEst.addCell(crearCelda(estudiante.getCodigoEstudiante(), texto));

            if (matricula != null) {
                infoEst.addCell(crearCelda("Grado:", textoBold));
                infoEst.addCell(crearCelda(matricula.getGrado() + " - " + matricula.getSeccion(), texto));
                infoEst.addCell(crearCelda("Nivel:", textoBold));
                infoEst.addCell(crearCelda(matricula.getNivel(), texto));
            }

            document.add(infoEst);
            document.add(new Paragraph(" "));

            // Agrupar calificaciones por tarea/curso
            Map<String, List<Calificacion>> calificacionesPorCurso = new LinkedHashMap<>();
            for (Calificacion cal : calificaciones) {
                Tarea tarea = tareaRepository.findById((long) cal.getIdTarea()).orElse(null);
                if (tarea != null) {
                    Curso curso = cursoRepository.findById(tarea.getIdCurso()).orElse(null);
                    if (curso != null) {
                        String clave = curso.getNombre();
                        calificacionesPorCurso.computeIfAbsent(clave, k -> new ArrayList<>()).add(cal);
                    }
                }
            }

            // Tabla de calificaciones
            PdfPTable tablaCal = new PdfPTable(5);
            tablaCal.setWidthPercentage(100);
            tablaCal.setSpacingBefore(10);

            // Header
            PdfPCell[] headers = {
                crearCeldaTitulo("Curso", tituloTabla, azul),
                crearCeldaTitulo("Tarea/Examen", tituloTabla, azul),
                crearCeldaTitulo("Nota", tituloTabla, azul),
                crearCeldaTitulo("Maximo", tituloTabla, azul),
                crearCeldaTitulo("Observacion", tituloTabla, azul)
            };
            for (PdfPCell h : headers) tablaCal.addCell(h);

            BigDecimal sumaNotas = BigDecimal.ZERO;
            int count = 0;

            for (Map.Entry<String, List<Calificacion>> entry : calificacionesPorCurso.entrySet()) {
                for (Calificacion cal : entry.getValue()) {
                    Tarea tarea = tareaRepository.findById((long) cal.getIdTarea()).orElse(null);

                    tablaCal.addCell(crearCelda(entry.getKey(), texto));
                    tablaCal.addCell(crearCelda(tarea != null ? tarea.getTitulo() : "-", texto));
                    tablaCal.addCell(crearCelda(cal.getNota().toString(), texto));
                    tablaCal.addCell(crearCelda(tarea != null ? tarea.getPuntajeMaximo().toString() : "-", texto));
                    tablaCal.addCell(crearCelda(cal.getObservacion() != null ? cal.getObservacion() : "-", texto));

                    sumaNotas = sumaNotas.add(cal.getNota());
                    count++;
                }
            }

            document.add(tablaCal);

            // Promedio general
            document.add(new Paragraph(" "));
            if (count > 0) {
                BigDecimal promedio = sumaNotas.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP);
                Font promFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, azul);

                PdfPTable tablaProm = new PdfPTable(2);
                tablaProm.setWidthPercentage(50);
                tablaProm.setHorizontalAlignment(Element.ALIGN_RIGHT);

                PdfPCell labelProm = new PdfPCell(new Phrase("PROMEDIO GENERAL:", promFont));
                labelProm.setHorizontalAlignment(Element.ALIGN_RIGHT);
                labelProm.setPadding(8);
                tablaProm.addCell(labelProm);

                PdfPCell valueProm = new PdfPCell(new Phrase(promedio.toString(), promFont));
                valueProm.setHorizontalAlignment(Element.ALIGN_CENTER);
                valueProm.setBackgroundColor(gris);
                valueProm.setPadding(8);
                tablaProm.addCell(valueProm);

                document.add(tablaProm);
            }

            document.add(new Paragraph(" "));
            Paragraph footer = new Paragraph("C.E.P. La Sagrada Familia - Año Escolar 2025",
                    FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.GRAY));
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // =========================
    // 3. REPORTE GENERAL DE NOTAS POR CURSO
    // =========================
    public byte[] generarReporteGeneralNotas(Integer idCurso) {
        try {
            Curso curso = cursoRepository.findById(idCurso).orElse(null);
            if (curso == null) return null;

            List<Tarea> tareas = tareaRepository.findByCurso(idCurso);

            Document document = new Document(PageSize.A4, 20, 20, 20, 20);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            agregarEncabezado(document);

            Font subtitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK);
            Font texto = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);
            Font textoBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.BLACK);
            Font tituloTabla = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.WHITE);

            // Titulo
            PdfPTable tituloDoc = new PdfPTable(1);
            tituloDoc.setWidthPercentage(100);
            PdfPCell tituloCell = new PdfPCell(new Phrase("REPORTE GENERAL DE NOTAS - " + curso.getNombre().toUpperCase(),
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.WHITE)));
            tituloCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            tituloCell.setBackgroundColor(azul);
            tituloCell.setPadding(10);
            tituloDoc.addCell(tituloCell);
            document.add(tituloDoc);
            document.add(new Paragraph(" "));

            // Obtener todos los estudiantes con calificaciones en este curso
            List<Calificacion> todasCal = calificacionRepository.findAllOrdered();
            Map<Integer, Estudiante> mapaEstudiantes = new LinkedHashMap<>();
            Map<Integer, Map<String, BigDecimal>> notasPorEstudiante = new LinkedHashMap<>();

            for (Calificacion cal : todasCal) {
                Tarea tarea = tareaRepository.findById((long) cal.getIdTarea()).orElse(null);
                if (tarea != null && tarea.getIdCurso() == idCurso) {
                    Estudiante est = estudianteRepository.findById(cal.getIdEstudiante()).orElse(null);
                    if (est != null) {
                        mapaEstudiantes.put(cal.getIdEstudiante(), est);
                        notasPorEstudiante
                            .computeIfAbsent(cal.getIdEstudiante(), k -> new LinkedHashMap<>())
                            .put(tarea.getTitulo(), cal.getNota());
                    }
                }
            }

            // Construir columnas dinamicamente segun tareas
            int numCol = 3 + tareas.size() + 1; // Codigo + Nombre + Apellido + [tareas] + Promedio
            PdfPTable tabla = new PdfPTable(numCol);
            tabla.setWidthPercentage(100);
            tabla.setSpacingBefore(10);

            // Header
            tabla.addCell(crearCeldaTitulo("Codigo", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Nombres", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Apellidos", tituloTabla, azul));
            for (Tarea t : tareas) {
                String titulo = t.getTitulo();
                if (titulo.length() > 15) titulo = titulo.substring(0, 15) + "...";
                tabla.addCell(crearCeldaTitulo(titulo, tituloTabla, azul));
            }
            tabla.addCell(crearCeldaTitulo("Promedio", tituloTabla, azul));

            // Filas
            for (Map.Entry<Integer, Estudiante> entry : mapaEstudiantes.entrySet()) {
                Estudiante est = entry.getValue();
                Map<String, BigDecimal> notas = notasPorEstudiante.get(entry.getKey());

                tabla.addCell(crearCelda(est.getCodigoEstudiante(), texto));
                tabla.addCell(crearCelda(est.getNombres(), texto));
                tabla.addCell(crearCelda(est.getApellidoPaterno() + " " + est.getApellidoMaterno(), texto));

                BigDecimal suma = BigDecimal.ZERO;
                int cant = 0;
                for (Tarea t : tareas) {
                    BigDecimal nota = notas.get(t.getTitulo());
                    if (nota != null) {
                        tabla.addCell(crearCelda(nota.toString(), texto));
                        suma = suma.add(nota);
                        cant++;
                    } else {
                        tabla.addCell(crearCelda("-", texto));
                    }
                }

                if (cant > 0) {
                    BigDecimal prom = suma.divide(BigDecimal.valueOf(cant), 2, RoundingMode.HALF_UP);
                    tabla.addCell(crearCelda(prom.toString(), textoBold));
                } else {
                    tabla.addCell(crearCelda("-", texto));
                }
            }

            document.add(tabla);

            document.add(new Paragraph(" "));
            Paragraph footer = new Paragraph("C.E.P. La Sagrada Familia - Año Escolar 2025",
                    FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.GRAY));
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // =========================
    // 4. CONSTANCIA DE MATRICULA
    // =========================
    public byte[] generarConstanciaMatricula(Integer idEstudiante) {
        try {
            Estudiante estudiante = estudianteRepository.findById(idEstudiante).orElse(null);
            if (estudiante == null) return null;

            Matricula matricula = estudiante.getMatricula();
            if (matricula == null) return null;

            Document document = new Document(PageSize.A4, 40, 40, 30, 30);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            agregarEncabezado(document);

            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, azul);
            Font subtituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);
            Font texto = FontFactory.getFont(FontFactory.HELVETICA, 11, BaseColor.BLACK);
            Font textoBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11, BaseColor.BLACK);
            Font textoItalic = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 11, BaseColor.GRAY);

            // Titulo
            Paragraph titulo = new Paragraph("CONSTANCIA DE MATRICULA", tituloFont);
            titulo.setAlignment(Element.ALIGN_CENTER);
            document.add(titulo);
            document.add(new Paragraph(" "));

            // Codigo
            Paragraph codigo = new Paragraph("Codigo: " + estudiante.getCodigoEstudiante(), textoBold);
            codigo.setAlignment(Element.ALIGN_RIGHT);
            document.add(codigo);
            document.add(new Paragraph(" "));

            // Cuerpo de la constancia
            String nombreCompleto = estudiante.getNombres() + " " + estudiante.getApellidoPaterno() + " " + estudiante.getApellidoMaterno();
            Paragraph cuerpo1 = new Paragraph(
                "Se certifica que el/la alumno(a) " + nombreCompleto.toUpperCase() +
                ", identificado(a) con DNI N. " + estudiante.getDireccion() + ", " +
                "se encuentra debidamente matriculado(a) en nuestra Institucion Educativa para el Año Escolar 2025.",
                texto
            );
            cuerpo1.setAlignment(Element.ALIGN_JUSTIFIED);
            cuerpo1.setSpacingAfter(15);
            document.add(cuerpo1);

            // Datos de matricula en tabla
            PdfPTable tablaDatos = new PdfPTable(2);
            tablaDatos.setWidthPercentage(60);
            tablaDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            tablaDatos.setSpacingBefore(10);
            tablaDatos.setSpacingAfter(15);

            tablaDatos.addCell(crearCelda("Nivel:", textoBold));
            tablaDatos.addCell(crearCelda(matricula.getNivel(), texto));
            tablaDatos.addCell(crearCelda("Grado:", textoBold));
            tablaDatos.addCell(crearCelda(matricula.getGrado(), texto));
            tablaDatos.addCell(crearCelda("Seccion:", textoBold));
            tablaDatos.addCell(crearCelda(matricula.getSeccion(), texto));
            tablaDatos.addCell(crearCelda("Fecha de Matricula:", textoBold));
            tablaDatos.addCell(crearCelda(matricula.getFechaMatricula().toString(), texto));

            document.add(tablaDatos);

            // Cierre
            Paragraph cierre = new Paragraph(
                "Se expide la presente constancia a solicitud del interesado(a) para los fines que estime convenientes.",
                texto
            );
            cierre.setAlignment(Element.ALIGN_JUSTIFIED);
            cierre.setSpacingAfter(30);
            document.add(cierre);

            // Linea de fecha
            Paragraph fecha = new Paragraph("Lima, " + java.time.LocalDate.now().getDayOfMonth() + " de " +
                obtenerMes(java.time.LocalDate.now().getMonthValue()) + " de " + java.time.LocalDate.now().getYear(), texto);
            fecha.setAlignment(Element.ALIGN_RIGHT);
            fecha.setSpacingAfter(40);
            document.add(fecha);

            // Firmas
            PdfPTable tablaFirmas = new PdfPTable(2);
            tablaFirmas.setWidthPercentage(100);
            tablaFirmas.setSpacingBefore(20);

            Font firmaFont = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);
            Font firmaLinea = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.GRAY);

            PdfPCell firmaIzq = new PdfPCell();
            firmaIzq.setBorder(Rectangle.NO_BORDER);
            firmaIzq.setHorizontalAlignment(Element.ALIGN_CENTER);
            firmaIzq.addElement(new Paragraph("_________________________", firmaLinea));
            firmaIzq.addElement(new Paragraph("Director(a)", firmaFont));
            firmaIzq.addElement(new Paragraph("C.E.P. La Sagrada Familia", firmaFont));

            PdfPCell firmaDer = new PdfPCell();
            firmaDer.setBorder(Rectangle.NO_BORDER);
            firmaDer.setHorizontalAlignment(Element.ALIGN_CENTER);
            firmaDer.addElement(new Paragraph("_________________________", firmaLinea));
            firmaDer.addElement(new Paragraph("Representante Legal", firmaFont));
            firmaDer.addElement(new Paragraph("C.E.P. La Sagrada Familia", firmaFont));

            tablaFirmas.addCell(firmaIzq);
            tablaFirmas.addCell(firmaDer);

            document.add(tablaFirmas);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String obtenerMes(int mes) {
        String[] meses = {"", "enero", "febrero", "marzo", "abril", "mayo", "junio",
                          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"};
        return meses[mes];
    }

    // =========================
    // 5. LISTADO DE ESTUDIANTES POR GRADO/SECCION
    // =========================
    public byte[] generarListadoEstudiantes(String grado, String seccion) {
        try {
            List<Estudiante> todosEstudiantes = estudianteRepository.findAll();

            List<Estudiante> filtrados = new ArrayList<>();
            for (Estudiante est : todosEstudiantes) {
                Matricula mat = est.getMatricula();
                if (mat != null) {
                    boolean coincideGrado = grado == null || grado.isEmpty() || mat.getGrado().equals(grado);
                    boolean coincideSeccion = seccion == null || seccion.isEmpty() || mat.getSeccion().equals(seccion);
                    if (coincideGrado && coincideSeccion) {
                        filtrados.add(est);
                    }
                }
            }

            Document document = new Document(PageSize.A4, 20, 20, 20, 20);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            agregarEncabezado(document);

            Font texto = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);
            Font textoBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.BLACK);
            Font tituloTabla = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.WHITE);

            // Titulo
            String tituloTexto = "LISTADO DE ESTUDIANTES";
            if (grado != null && !grado.isEmpty()) {
                tituloTexto += " - " + grado + "°";
                if (seccion != null && !seccion.isEmpty()) {
                    tituloTexto += " " + seccion;
                }
            }

            PdfPTable tituloDoc = new PdfPTable(1);
            tituloDoc.setWidthPercentage(100);
            PdfPCell tituloCell = new PdfPCell(new Phrase(tituloTexto,
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.WHITE)));
            tituloCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            tituloCell.setBackgroundColor(azul);
            tituloCell.setPadding(10);
            tituloDoc.addCell(tituloCell);
            document.add(tituloDoc);
            document.add(new Paragraph(" "));

            // Subtitulo info
            Paragraph info = new Paragraph("Total de estudiantes: " + filtrados.size(),
                    FontFactory.getFont(FontFactory.HELVETICA, 11, BaseColor.GRAY));
            info.setAlignment(Element.ALIGN_LEFT);
            document.add(info);
            document.add(new Paragraph(" "));

            // Tabla
            PdfPTable tabla = new PdfPTable(7);
            tabla.setWidthPercentage(100);
            tabla.setSpacingBefore(5);

            // Header
            tabla.addCell(crearCeldaTitulo("N°", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Codigo", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Nombres", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Apellidos", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Grado", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Seccion", tituloTabla, azul));
            tabla.addCell(crearCeldaTitulo("Sexo", tituloTabla, azul));

            // Filas
            int num = 1;
            for (Estudiante est : filtrados) {
                Matricula mat = est.getMatricula();

                tabla.addCell(crearCelda(String.valueOf(num++), texto));
                tabla.addCell(crearCelda(est.getCodigoEstudiante(), texto));
                tabla.addCell(crearCelda(est.getNombres(), texto));
                tabla.addCell(crearCelda(est.getApellidoPaterno() + " " + est.getApellidoMaterno(), texto));
                tabla.addCell(crearCelda(mat != null ? mat.getGrado() : "-", texto));
                tabla.addCell(crearCelda(mat != null ? mat.getSeccion() : "-", texto));
                tabla.addCell(crearCelda(est.getSexo(), texto));
            }

            document.add(tabla);

            document.add(new Paragraph(" "));
            Paragraph footer = new Paragraph("C.E.P. La Sagrada Familia - Año Escolar 2025",
                    FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.GRAY));
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
