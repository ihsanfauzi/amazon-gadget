package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public class FrShippingPriceCalculator extends BaseShippingPriceCalculator {
	public static String REGION_Autres_pays_du_monde = "Autres pays du monde";
	public static String REGION_Europe_pays_limitrophes_hors_Suisse = "Europe : pays limitrophes hors Suisse";
	public static String REGION_Europe_autres_pays = "Europe: autres pays";
	public static String REGION_Etats_Unis_et_Canada = "Etats-Unis et Canada";
	public static String REGION_France_metropolitaine_et_Monaco = "France métropolitaine et Monaco";
	public static String REGION_DOM_TOM = "DOM TOM";

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
