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

	@Override
	public ShippingPriceDTO calculateComplex(String region, String content) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ShippingPriceDTO calculateSimple(String region, String content) {
		if (REGION_Belgien_Danemark_Frankreich_Irland_Niederlande_Grobritannien.equals(region)) {
			region = "Belgien, ";
		}
		return super.calculateSimple(region, content);
	}
	
	protected Boolean extractPerItem(String content, ShippingPriceDTO dto) {
		if (content == null || content.indexOf("pro Artikel") == -1) {
			return Boolean.FALSE;
		}
		return super.extractPerItemInternal(content, dto);
	}
	
	protected Boolean extractPerWeight(String content, ShippingPriceDTO dto) {
		if (content == null || content.indexOf("nach Gewicht") == -1) {
			return Boolean.FALSE;
		}
		return super.extractPerWeightInternal(content, dto);
	}
	
	protected Boolean extractPerShipment(String content, ShippingPriceDTO dto) {
		if (content == null || content.indexOf("pro Sendung") == -1) {
			return Boolean.FALSE;
		}
		return super.extractPerShipmentInternal(content, dto);
	}
}