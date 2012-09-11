package test;

import org.junit.Test;

import amazon.check.shipping.BaseShippingPriceCalculator;
import amazon.check.shipping.CheckerFactory;
import amazon.check.shipping.ShippingPriceCalculatorFactory;
import amazon.check.shipping.UkShippingPriceCalculator;
import amazon.check.shipping.dto.ShippingPriceDTO;

public class ShippingPriceComplexTests extends ShippingPriceBaseTestCase {
	@Test
	public void testUkComplex() {
		try {
			String content = loadContent("shipping_price/co.uk/complex.html");
			BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(CheckerFactory.WWW_AMAZON_CO_UK);

			String region = UkShippingPriceCalculator.REGION_Australia_and_Far_East_Asia;
			ShippingPriceDTO res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_BFPO;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_1;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_2;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_3;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_Japan;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_North_America;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_Rest_of_World;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_UK_Street;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UkShippingPriceCalculator.REGION_UK_PO_Box;
			res = c.calculate(region, content);
			traceComplex(region, res);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
