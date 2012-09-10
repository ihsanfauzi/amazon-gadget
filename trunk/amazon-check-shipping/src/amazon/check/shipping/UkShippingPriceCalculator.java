package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public class UkShippingPriceCalculator extends BaseShippingPriceCalculator {

	public static String REGION_Europe_Zone_3 = "Europe Zone 3";
	public static String REGION_Rest_of_World = "Rest of World";
	public static String REGION_Australia_and_Far_East_Asia = "Australia and Far East Asia";
	public static String REGION_Europe_Zone_1 = "Europe Zone 1";
	public static String REGION_North_America = "North America";
	public static String REGION_Europe_Zone_2 = "Europe Zone 2";
	public static String REGION_Japan = "Japan";
	public static String REGION_UK_Street = "UK Street";
	public static String REGION_UK_Mainland_PO_Box = "UK Mainland PO Box";
	public static String REGION_BFPO = "BFPO";
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
