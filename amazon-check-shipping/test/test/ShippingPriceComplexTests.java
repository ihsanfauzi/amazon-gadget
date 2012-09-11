package test;

import org.junit.Test;

import amazon.check.shipping.BaseShippingPriceCalculator;
import amazon.check.shipping.CheckerFactory;
import amazon.check.shipping.ShippingPriceCalculatorFactory;
import amazon.check.shipping.UkShippingPriceCalculator;
import amazon.check.shipping.UsShippingPriceCalculator;
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
	
	@Test
	public void testUsComplex() {
		try {
			String content = loadContent("shipping_price/com/complex.html");
			BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(CheckerFactory.WWW_AMAZON_COM);

			String region = UsShippingPriceCalculator.REGION_Alaska_and_Hawaii;
			ShippingPriceDTO res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_Alaska_and_Hawaii_PO_Box;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_APO_FPO;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_APO_FPO_PO_Box;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_Asia;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_Canada;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_Continental_US;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_Continental_US_PO_Box;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_Europe;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_Outside_US_Eur_CA_Asia;
			res = c.calculate(region, content);
			traceComplex(region, res);

			region = UsShippingPriceCalculator.REGION_US_Protectorates;
			res = c.calculate(region, content);
			traceComplex(region, res);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
