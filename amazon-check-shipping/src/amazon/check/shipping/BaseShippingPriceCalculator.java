package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public abstract class BaseShippingPriceCalculator {
	public abstract ShippingPriceDTO calculate(String region, String content);
}
