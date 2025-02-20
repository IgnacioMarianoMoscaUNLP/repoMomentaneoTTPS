package buffetAplicacion.Modelo;
/**
 * @author manuel
 */
public class Credentials {

    private String token;
    private int exp;
    private String role;

    public Credentials() {
    }

    public Credentials(String token, int exp, String username) {
        this.token = token;
        this.exp = exp;
        this.role = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}