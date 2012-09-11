package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public class UsShippingPriceCalculator extends BaseShippingPriceCalculator {

	public static String REGION_Outside_US_Eur_CA_Asia = "Outside US, Eur., CA, Asia";
	public static String REGION_Europe = "Europe";
	public static String REGION_US_Protectorates = "US Protectorates";
	public static String REGION_Asia = "Asia";
	public static String REGION_Canada = "Canada";
	public static String REGION_Continental_US = "Continental US";
	public static String REGION_Continental_US_PO_Box = "Continental US PO Box";
	public static String REGION_Alaska_and_Hawaii = "Alaska and Hawaii";
	public static String REGION_Alaska_and_Hawaii_PO_Box = "Alaska and Hawaii PO Box";
	public static String REGION_APO_FPO = "APO/FPO";
	public static String REGION_APO_FPO_PO_Box = "APO/FPO PO Box";
	
	@Override
	public ShippingPriceDTO calculateComplex(String region, String content) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ShippingPriceDTO calculateSimple(String region, String content) {
		ShippingPriceDTO dto = new ShippingPriceDTO();
		String regionSub = subContent(content, region);
		String perItemSub = subContent(regionSub, "<tr bgcolor=", "</tr>");
		extractPerItem(perItemSub, dto);
		return dto;
	}

	private void extractPerItem(String content, ShippingPriceDTO dto) {
		if (content == null) {
			return;
		}
		//Skip 2 columns
		content = subContent(content, "</td>");
		content = subContent(content, "</td>");
		
		String standardPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perItemStandard = toDouble(standardPriceSub);
		
		content = subContent(content, "</td>");
		
		String expeditedPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perItemExpedited = toDouble(expeditedPriceSub);
		
		$void();
	}

	private void $void() {
	}
}
