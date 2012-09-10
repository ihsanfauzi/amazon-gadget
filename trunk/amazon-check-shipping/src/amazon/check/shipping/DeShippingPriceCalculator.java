package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public class DeShippingPriceCalculator extends BaseShippingPriceCalculator {

	public static String REGION_Weltweit = "Weltweit";
	public static String REGION_Ubriges_Europa = "Übriges Europa";
	public static String REGION_Belgien_Danemark_Frankreich_Irland_Niederlande_Grobritannien = "Belgien, Dänemark , Frankreich, Irland, Niederlande, Großbritannien";
	public static String REGION_Deutschland = "Deutschland";
	public static String REGION_Finnland_Griechenland_Italien_Portugal_Spanien_Schweden = "Finnland, Griechenland, Italien, Portugal, Spanien, Schweden";
	public static String REGION_Japan = "Japan";
	public static String REGION_USA_Kanada = "USA, Kanada";
	public static String REGION_Schweiz_Liechtenstein_Luxemburg = "Schweiz, Liechtenstein, Luxemburg";
	public static String REGION_Osterreich = "Österreich";

	@Override
	public ShippingPriceDTO calculateComplex(String region, String content) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ShippingPriceDTO calculateSimple(String region, String content) {
		// TODO Auto-generated method stub
		return null;
	}
}