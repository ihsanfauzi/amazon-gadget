package amazon.check.shipping;

public class ShippingPriceCalculatorFactory {

	public static BaseShippingPriceCalculator getCalulator(String store) {
		if (CheckerFactory.WWW_AMAZON_DE.equals(store)) {
			return new DeShippingPriceCalculator();
		} else if (CheckerFactory.WWW_AMAZON_COM.equals(store)) {
			return new UsShippingPriceCalculator();
		} else if (CheckerFactory.WWW_AMAZON_CO_UK.equals(store)) {
			return new UkShippingPriceCalculator();
		} else if (CheckerFactory.WWW_AMAZON_FR.equals(store)) {
			return new FrShippingPriceCalculator();
		}
		return null;
	}
}
