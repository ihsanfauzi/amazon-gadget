package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.junit.Before;
import org.junit.Test;

import amazon.check.shipping.BaseShippingPriceCalculator;
import amazon.check.shipping.CheckerFactory;
import amazon.check.shipping.ShippingPriceCalculatorFactory;
import amazon.check.shipping.UkShippingPriceCalculator;
import amazon.check.shipping.dto.ShippingPriceDTO;


public class ShippingPriceTests {
	@Before
	public void init(){
	}
	
	@Test
	public void testUkSimple() {
		try {
			String content = loadContent("shipping_price/co.uk/simple.html");
			BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(CheckerFactory.WWW_AMAZON_CO_UK);

			String region = UkShippingPriceCalculator.REGION_Australia_and_Far_East_Asia;
			ShippingPriceDTO res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_BFPO;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_1;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_2;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_3;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_Japan;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_North_America;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_Rest_of_World;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_UK_Mainland;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

			region = UkShippingPriceCalculator.REGION_UK_Mainland_PO_Box;
			res = c.calculate(region, content);
			System.out.println(res.minPrice + " - " + region);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String loadContent(String string) throws Exception {
		File f = new File(string);
		String s = "";
		String content = "";
		BufferedReader br = new BufferedReader(new FileReader(f));
		while((s = br.readLine())!=null) {
			content = content + s + "\n";
		}
		return content;
	}
}
