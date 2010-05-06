package amazon.check.shipping;

public class CheckerFactory {
	public static final String WWW_AMAZON_FR = "www.amazon.fr";
	public static final String WWW_AMAZON_CO_UK = "www.amazon.co.uk";
	public static final String WWW_AMAZON_COM = "www.amazon.com";
	public static final String WWW_AMAZON_DE = "www.amazon.de";

	public static BaseChecker getChecker(String store) {
		if (WWW_AMAZON_DE.equals(store)) {
			return new DeChecker();
		} else if (WWW_AMAZON_COM.equals(store)) {
			return new UsChecker();
		} else if (WWW_AMAZON_CO_UK.equals(store)) {
			return new UkChecker();
		} else if (WWW_AMAZON_FR.equals(store)) {
			return new FrChecker();
		}
		return null;
	}
}
