package backend.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.BaseColor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.util.*;

@Service
public class MetabaseService {

    @Value("${metabase.url:http://localhost:3000}")
    private String metabaseUrl;

    @Value("${metabase.username:admin@colegio.com}")
    private String metabaseUsername;

    @Value("${metabase.password:admin123}")
    private String metabasePassword;

    private String sessionToken;

    private final RestTemplate restTemplate = new RestTemplate();

    private final BaseColor azul = new BaseColor(25, 45, 90);
    private final BaseColor gris = new BaseColor(245, 245, 245);

    // =========================
    // AUTENTICACION CON METABASE
    // =========================
    public String autenticar() {
        if (sessionToken != null) return sessionToken;

        try {
            String url = metabaseUrl + "/api/session";
            Map<String, String> body = new HashMap<>();
            body.put("username", metabaseUsername);
            body.put("password", metabasePassword);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("id")) {
                sessionToken = (String) response.getBody().get("id");
                return sessionToken;
            }
        } catch (Exception e) {
            System.out.println("Error al autenticar en Metabase: " + e.getMessage());
        }
        return null;
    }

    // =========================
    // OBTENER DATOS DE UNA VISTA
    // =========================
    public Map<String, Object> obtenerDatosVista(String nombreVista) {
        String token = autenticar();
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("columnas", Collections.emptyList());
        resultado.put("filas", Collections.emptyList());

        if (token == null) return resultado;

        try {
            String url = metabaseUrl + "/api/dataset";
            Map<String, Object> nativeQuery = new HashMap<>();
            nativeQuery.put("query", "SELECT * FROM " + nombreVista);

            Map<String, Object> body = new HashMap<>();
            body.put("database", 2);
            body.put("type", "native");
            body.put("native", nativeQuery);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-Metabase-Session", token);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("data")) {
                Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");

                List<Map<String, Object>> cols = (List<Map<String, Object>>) data.get("cols");
                List<String> columnNames = new ArrayList<>();
                if (cols != null) {
                    for (Map<String, Object> col : cols) {
                        columnNames.add((String) col.get("display_name"));
                    }
                }

                List<List<Object>> rows = (List<List<Object>>) data.get("rows");
                List<Map<String, Object>> filas = new ArrayList<>();
                if (rows != null) {
                    for (List<Object> row : rows) {
                        Map<String, Object> fila = new LinkedHashMap<>();
                        for (int i = 0; i < columnNames.size() && i < row.size(); i++) {
                            fila.put(columnNames.get(i), row.get(i));
                        }
                        filas.add(fila);
                    }
                }

                resultado.put("columnas", columnNames);
                resultado.put("filas", filas);
            }
        } catch (Exception e) {
            System.out.println("Error al obtener datos de Metabase: " + e.getMessage());
        }
        return resultado;
    }

    // =========================
    // OBTENER COLUMNAS DE UNA VISTA
    // =========================
    public List<String> obtenerColumnas(String nombreVista) {
        String token = autenticar();
        if (token == null) return Collections.emptyList();

        try {
            String url = metabaseUrl + "/api/dataset";
            Map<String, Object> nativeQuery = new HashMap<>();
            nativeQuery.put("query", "SELECT * FROM " + nombreVista + " LIMIT 1");

            Map<String, Object> body = new HashMap<>();
            body.put("database", 2);
            body.put("type", "native");
            body.put("native", nativeQuery);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-Metabase-Session", token);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("data")) {
                Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");
                List<Map<String, Object>> cols = (List<Map<String, Object>>) data.get("cols");
                List<String> columnNames = new ArrayList<>();
                if (cols != null) {
                    for (Map<String, Object> col : cols) {
                        columnNames.add((String) col.get("display_name"));
                    }
                }
                return columnNames;
            }
        } catch (Exception e) {
            System.out.println("Error al obtener columnas: " + e.getMessage());
        }
        return Collections.emptyList();
    }

    // =========================
    // ENCABEZADO COMUN
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
    // GENERAR PDF DESDE VISTA DE METABASE
    // =========================
    public byte[] generarPdfDesdeVista(String nombreVista, String tituloReporte) {
        try {
            Map<String, Object> datosMap = obtenerDatosVista(nombreVista);
            List<String> columnas = (List<String>) datosMap.get("columnas");
            List<Map<String, Object>> filas = (List<Map<String, Object>>) datosMap.get("filas");

            if (columnas == null || columnas.isEmpty()) return null;

            Document document = new Document(PageSize.A4.rotate(), 20, 20, 20, 20);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            agregarEncabezado(document);

            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, azul);
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, BaseColor.WHITE);
            Font textoFont = FontFactory.getFont(FontFactory.HELVETICA, 8, BaseColor.BLACK);

            // Titulo del reporte
            Paragraph titulo = new Paragraph(tituloReporte, tituloFont);
            titulo.setAlignment(Element.ALIGN_CENTER);
            titulo.setSpacingAfter(10);
            document.add(titulo);

            // Fecha
            Paragraph fecha = new Paragraph("Generado: " + java.time.LocalDateTime.now().format(
                java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), 
                FontFactory.getFont(FontFactory.HELVETICA, 9, BaseColor.GRAY));
            fecha.setAlignment(Element.ALIGN_RIGHT);
            fecha.setSpacingAfter(10);
            document.add(fecha);

            // Tabla
            PdfPTable tabla = new PdfPTable(columnas.size());
            tabla.setWidthPercentage(100);
            tabla.setSpacingBefore(5);

            // Headers
            for (String col : columnas) {
                PdfPCell cell = new PdfPCell(new Phrase(col.toUpperCase(), headerFont));
                cell.setBackgroundColor(azul);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setPadding(6);
                tabla.addCell(cell);
            }

            // Datos
            if (filas != null) {
                for (Map<String, Object> fila : filas) {
                    for (String col : columnas) {
                        Object valor = fila.get(col);
                        String texto = valor != null ? valor.toString() : "-";
                        PdfPCell cell = new PdfPCell(new Phrase(texto, textoFont));
                        cell.setPadding(4);
                        tabla.addCell(cell);
                    }
                }
            }

            document.add(tabla);

            // Footer
            document.add(new Paragraph(" "));
            Paragraph footer = new Paragraph("C.E.P. La Sagrada Familia - Reporte desde Metabase",
                    FontFactory.getFont(FontFactory.HELVETICA, 8, BaseColor.GRAY));
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
    // LISTAR VISTAS DISPONIBLES
    // =========================
    public List<String> listarVistas() {
        return Arrays.asList(
            "vw_resumen_sistema",
            "vw_estudiantes_matricula",
            "vw_calificaciones_detalle",
            "vw_promedio_estudiantes",
            "vw_rendimiento_cursos",
            "vw_matriculas_por_fecha",
            "vw_distribucion_estudiantes",
            "vw_tareas_por_curso",
            "vw_solicitudes_matricula",
            "vw_docentes_cursos",
            "vw_ranking_estudiantes",
            "vw_materiales_cursos"
        );
    }
}
