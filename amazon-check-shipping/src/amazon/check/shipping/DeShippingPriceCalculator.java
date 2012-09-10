package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public class DeShippingPriceCalculator extends BaseShippingPriceCalculator {

	public static String REGION_Weltweit = "Weltweit";
	public static String REGION_Ubriges_Europa = "‹briges Europa";
	public static String REGION_Belgien_Danemark_Frankreich_Irland_Niederlande_Grobritannien = "Belgien, D‰nemark , Frankreich, Irland, Niederlande, Groﬂbritannien";
	public static String REGION_Deutschland = "Deutschland";
	public static String REGION_Finnland_Griechenland_Italien_Portugal_Spanien_Schweden = "Finnland, Griechenland, Italien, Portugal, Spanien, Schweden";
	public static String REGION_Japan = "Japan";
	public static String REGION_USA_Kanada = "USA, Kanada";
	public static String REGION_Schweiz_Liechtenstein_Luxemburg = "Schweiz, Liechtenstein, Luxemburg";
	public static String REGION_Osterreich = "÷sterreich";

	public ShippingPriceDTO calculate(String region, String content) {
		return null;
	}
}