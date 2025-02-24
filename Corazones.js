import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.Random;

public class MensajesDeAmor extends JFrame {
    private ArrayList<Corazon> corazones;
    private ArrayList<String> mensajes;
    private final int ANCHO = 800;
    private final int ALTO = 600;
    private Random random;

    public MensajesDeAmor() {
        this.setTitle("Mensajes de Amor");
        this.setSize(ANCHO, ALTO);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setLocationRelativeTo(null);
        
        corazones = new ArrayList<>();
        mensajes = new ArrayList<>();
        random = new Random();

        // Agregar mensajes
        for (int i = 0; i < 50; i++) {
            mensajes.add("I love you!");
        }

        // Iniciar animación
        Timer timer = new Timer(50, e -> {
            if (random.nextInt(100) < 10) {
                corazones.add(new Corazon(random.nextInt(ANCHO), ALTO));
            }
            moverCorazones();
            repaint();
        });
        timer.start();
    }

    private void moverCorazones() {
        corazones.removeIf(corazon -> corazon.y < -20);
        for (Corazon corazon : corazones) {
            corazon.mover();
        }
    }

    @Override
    public void paint(Graphics g) {
        super.paint(g);
        Graphics2D g2d = (Graphics2D) g;
        
        // Dibujar fondo rosa
        g2d.setColor(new Color(255, 182, 193));
        g2d.fillRect(0, 0, ANCHO, ALTO);

        // Dibujar tulipanes en los bordes
        dibujarTulipan(g2d, 0, ALTO/2);
        dibujarTulipan(g2d, ANCHO-50, ALTO/2);

        // Dibujar mensajes
        g2d.setColor(new Color(255, 20, 147));
        g2d.setFont(new Font("Arial", Font.BOLD, 20));
        int y = 50;
        for (String mensaje : mensajes) {
            g2d.drawString(mensaje, ANCHO/2 - 50, y);
            y += 30;
            if (y > ALTO - 50) break;
        }

        // Dibujar corazones
        g2d.setColor(Color.MAGENTA);
        for (Corazon corazon : corazones) {
            dibujarCorazon(g2d, corazon.x, corazon.y);
        }
    }

    private void dibujarCorazon(Graphics2D g2d, int x, int y) {
        g2d.fillArc(x, y, 20, 20, 0, 180);
        g2d.fillArc(x + 20, y, 20, 20, 0, 180);
        int[] triangleX = {x, x + 20, x + 40};
        int[] triangleY = {y + 10, y + 40, y + 10};
        g2d.fillPolygon(triangleX, triangleY, 3);
    }

    private void dibujarTulipan(Graphics2D g2d, int x, int y) {
        g2d.setColor(new Color(255, 105, 180));
        // Tallo
        g2d.setColor(new Color(34, 139, 34));
        g2d.fillRect(x + 20, y, 10, 100);
        // Pétalos
        g2d.setColor(new Color(255, 105, 180));
        g2d.fillOval(x + 10, y - 30, 30, 40);
        g2d.fillOval(x, y - 20, 30, 40);
        g2d.fillOval(x + 20, y - 20, 30, 40);
    }

    private class Corazon {
        int x, y;
        double velocidad;

        public Corazon(int x, int y) {
            this.x = x;
            this.y = y;
            this.velocidad = 2 + random.nextDouble() * 3;
        }

        public void mover() {
            y -= velocidad;
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            MensajesDeAmor ventana = new MensajesDeAmor();
            ventana.setVisible(true);
        });
    }
}
