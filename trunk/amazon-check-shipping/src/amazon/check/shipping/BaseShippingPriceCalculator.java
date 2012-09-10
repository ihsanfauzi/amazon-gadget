package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public abstract class BaseShippingPriceCalculator {
	public ShippingPriceDTO calculate(String region, String content) {
		if (isSimple(content)) {
			return calculateSimple(region, content);
		} else {
			return calculateComplex(region, content);
		}
	}
	
	public abstract ShippingPriceDTO calculateComplex(String region, String content);
	
	public abstract ShippingPriceDTO calculateSimple(String region, String content);
	
	public Boolean isSimple(String content) {
		return content.indexOf("hideRates()") != -1;
	}
}
